import re
import filetype
from datetime import datetime

def validate_region(region):
    return bool(region)

def validate_comuna(comuna):
    return bool(comuna)

def validate_sector(sector):
    return len(sector) <= 100


def validate_nombre(nombre):
    return bool(nombre) and len(nombre) <= 200

def validate_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(email) and re.match(pattern, email) and len(email) <= 100

def validate_celular(celular):
    if not celular:
        return True  
    pattern = r'^\+\d{3}\.\d{8}$'
    return re.match(pattern, celular)

def validate_contactos(contactos, ids):
    if not contactos and not ids:
        return True  
    if len(contactos) > 5:
        return False
    for id_ in ids:
        if not (4 <= len(id_) <= 50):
            return False
    return True


def validate_fecha_hora_inicio(inicio):
    try:
        datetime.strptime(inicio, '%Y-%m-%dT%H:%M')
        return True
    except ValueError:
        return False

def validate_fecha_hora_termino(inicio, termino):
    if not termino:
        return True
    try:
        dt_inicio = datetime.strptime(inicio, '%Y-%m-%dT%H:%M')
        dt_termino = datetime.strptime(termino, '%Y-%m-%dT%H:%M')
        return dt_termino > dt_inicio
    except ValueError:
        return False


def validate_descripcion(descripcion):
    return True  


def validate_temas(temas, temas_otro):
    if not temas:
        return False
    for tema, otro in zip(temas, temas_otro):
        if tema == "otro":
            if not (3 <= len(otro) <= 15):
                return False
    return True


def validate_fotos(fotos):
    if not fotos or not (1 <= len(fotos) <= 5):
        return False
    for foto in fotos:
        kind = filetype.guess(foto)
        if not kind or kind.mime.split('/')[0] != 'image':
            return False
    return True