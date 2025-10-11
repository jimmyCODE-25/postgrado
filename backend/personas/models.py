from django.db import models

class Persona(models.Model):
    idpersona = models.AutoField(primary_key=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    direccion = models.CharField(max_length=200, blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    
    class Meta:
        db_table = 'persona'
        verbose_name = 'Persona'
        verbose_name_plural = 'Personas'
        ordering = ['idpersona']
    
    def __str__(self):
        return f"{self.nombres} {self.apellidos}"

class PlanFormacion(models.Model):
    id_pf = models.AutoField(primary_key=True)
    n_version = models.SmallIntegerField(null=True, blank=True)
    nombre = models.CharField(max_length=255)
    nivel_acad = models.IntegerField()
    total_cred = models.SmallIntegerField(null=True, blank=True)
    total_periodo = models.SmallIntegerField(null=True, blank=True)
    tipo_carr = models.IntegerField()
    fecha_creacion = models.DateField(null=True, blank=True)
    n_resol_alta = models.CharField(max_length=255, blank=True, null=True)
    fecha_baja = models.DateField(null=True, blank=True)
    n_resol_baja = models.CharField(max_length=255, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    estado = models.IntegerField()
    
    class Meta:
        db_table = 'plan_formacion'
        verbose_name = 'Plan de Formación'
        verbose_name_plural = 'Planes de Formación'
        ordering = ['-fecha_creacion']
    
    def __str__(self):
        return f"{self.nombre} (v{self.n_version})"
# Create your models here.
