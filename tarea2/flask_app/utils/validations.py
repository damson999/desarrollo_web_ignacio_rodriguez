import re
import filetype
from datetime import datetime

def validate_username(value):
    return value and len(value) > 4

