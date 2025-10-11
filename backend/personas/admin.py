from django.contrib import admin
from .models import Persona, PlanFormacion

# Register your models here.

@admin.register(Persona)
class PersonaAdmin(admin.ModelAdmin):
    list_display = ('idpersona', 'nombres', 'apellidos', 'email', 'telefono')
    search_fields = ('nombres', 'apellidos', 'email')


@admin.register(PlanFormacion)
class PlanFormacionAdmin(admin.ModelAdmin):
    list_display = ('id_pf', 'nombre', 'n_version', 'nivel_acad', 'tipo_carr', 'estado', 'fecha_creacion')
    list_filter = ('nivel_acad', 'tipo_carr', 'estado')
    search_fields = ('nombre', 'n_resol_alta')