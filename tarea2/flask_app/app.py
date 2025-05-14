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
    return render_template('index.html')

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
    return render_template('listado-actividades.html')   

@app.route('/estadisticas', methods=["GET", "POST"])
def estadisticas():
    return render_template('estadisticas.html')

@app.route('/informacion-fila1', methods=["GET", "POST"])
def informacionf1():
    return render_template('informacion-fila1.html')

@app.route('/informacion-fila2', methods=["GET", "POST"])
def informacionf2():
    return render_template('informacion-fila2.html')

@app.route('/informacion-fila3', methods=["GET", "POST"])
def informacionf3():
    return render_template('informacion-fila3.html')

@app.route('/informacion-fila4', methods=["GET", "POST"])
def informacionf4():
    return render_template('informacion-fila4.html')

@app.route('/informacion-fila5', methods=["GET", "POST"])
def informacionf5():
    return render_template('informacion-fila5.html')

