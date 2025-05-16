from flask import Flask, request, render_template, redirect, url_for, session
from database import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)


app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000


@app.route('/')
def portada():

    session = db.SessionLocal()
    try:
        actividades = (session.query(db.Actividad).order_by(db.Actividad.id.desc()).limit(5).all())
        datos = []

        for actividad in actividades:
            comuna = session.query(db.Comuna.nombre).filter_by(id=actividad.comuna_id).scalar()
            temas = session.query(db.ActividadTema).filter_by(actividad_id=actividad.id).all()
            fotos = session.query(db.Foto).filter_by(actividad_id=actividad.id).all()
            datos.append((actividad, comuna, temas, fotos))

        return render_template("index.html", datos=datos)
    
    finally:
        session.close()

@app.route('/agregar_actividad', methods=["GET", "POST"])
def agregar_actividad():
    
    if request.method == "POST":
        session = db.SessionLocal()
        try:
            nueva_actividad = db.Actividad(
                nombre=request.form['nombre'],
                sector=request.form['sector'],
                email=request.form['email'],
                celular=request.form['celular'],
                dia_hora_inicio=request.form['inicio'],
                dia_hora_termino=request.form['termino'],
                descripcion=request.form['descripcion'],
                comuna_id=request.form['comuna']
            )
            session.add(nueva_actividad)
            session.flush()

            #Guardamos temas
            temas = request.form.getlist('tema[]')
            glosas = request.form.getlist('tema_otro[]')
            
            for i in range(len(temas)):
                tema = temas[i].strip().lower()
                glosa = glosas[i].strip() if i < len(glosas) else ''

                if tema == "otro":
                    actividad_tema = db.ActividadTema(
                        actividad_id=nueva_actividad.id,
                        tema="otro",  
                        glosa_otro=glosa if glosa else None
                    )
                else:
                    actividad_tema = db.ActividadTema(
                        actividad_id=nueva_actividad.id,
                        tema=tema,
                        glosa_otro=None
                    )
                
                session.add(actividad_tema)

            #Guardamos contactos
            contactos = request.form.getlist('contacto[]')
            ids_contacto = request.form.getlist('contacto_id[]')
            for i in range(len(contactos)):
                medio = contactos[i]
                identificador = ids_contacto[i].strip()
                if medio and identificador:
                    actividad_contacto = db.ContactarPor(
                        actividad_id=nueva_actividad.id,
                        nombre=medio,
                        identificador=identificador
                    )
                    session.add(actividad_contacto)

            #Guardamos fotos
            fotos = request.files.getlist('fotos[]')
            for foto in fotos:
                if foto and foto.filename:
                    filename = secure_filename(foto.filename)
                    ruta = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    foto.save(ruta)
                    actividad_foto = db.Foto(
                        actividad_id=nueva_actividad.id,
                        ruta_archivo=ruta,
                        nombre_archivo=filename
                    )
                    session.add(actividad_foto)

            session.commit()
            return render_template('agregar-actividad.html', exito=True)
        
        except Exception as e:
            session.rollback()
            return f"Error al guardar: {e}"
        finally:
            session.close()

    return render_template('agregar-actividad.html')

@app.route('/listado-actividades', methods=["GET", "POST"])
def listado_actividades():
    
    session = db.SessionLocal()
    try:
        # Obtener número de página de la URL (por defecto página 1)
        pagina = int(request.args.get('pagina', 1))
        actividades_por_pagina = 5
        offset = (pagina - 1) * actividades_por_pagina

        total_actividades = session.query(db.Actividad).count()
        actividades = (
            session.query(db.Actividad)
            .order_by(db.Actividad.id.desc())
            .offset(offset)
            .limit(actividades_por_pagina)
            .all()
        )

        datos = []
        for actividad in actividades:
            comuna = session.query(db.Comuna.nombre).filter_by(id=actividad.comuna_id).scalar()
            temas = session.query(db.ActividadTema).filter_by(actividad_id=actividad.id).all()
            fotos = session.query(db.Foto).filter_by(actividad_id=actividad.id).all()
            datos.append((actividad, comuna, temas, fotos))

        total_paginas = (total_actividades + actividades_por_pagina - 1) // actividades_por_pagina

        return render_template("listado-actividades.html", datos=datos, pagina=pagina, total_paginas=total_paginas)
    finally:
        session.close()   

@app.route('/estadisticas', methods=["GET", "POST"])
def estadisticas():
    return render_template('estadisticas.html')

@app.route('/actividad/<int:actividad_id>')
def detalle_actividad(actividad_id):
    session = db.SessionLocal()
    try:
        actividad = session.query(db.Actividad).filter_by(id=actividad_id).first()
        if not actividad:
            return "Actividad no encontrada", 404

        comuna = session.query(db.Comuna.nombre).filter_by(id=actividad.comuna_id).scalar()
        temas = session.query(db.ActividadTema).filter_by(actividad_id=actividad.id).all()
        fotos = session.query(db.Foto).filter_by(actividad_id=actividad.id).all()

        return render_template("detalle_actividad.html", actividad=actividad, comuna=comuna, temas=temas, fotos=fotos)
    finally:
        session.close()

