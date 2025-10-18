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
    
    #Planformacion

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

    #Actividad
    
class Actividad(models.Model):
    id_act = models.AutoField(primary_key=True)
    id_acp = models.IntegerField(null=True, blank=True)
    id_pr = models.IntegerField(null=True, blank=True)
    n_actividad = models.IntegerField(null=True, blank=True)
    categ_programatica = models.CharField(max_length=255, unique=True)
    id_ue = models.IntegerField(null=True, blank=True)
    descripcion = models.CharField(max_length=500, blank=True, null=True)
    tipo = models.CharField(max_length=100, blank=True, null=True)
    clase = models.CharField(max_length=100, blank=True, null=True)
    unidad_medida = models.CharField(max_length=100, blank=True, null=True)
    fecha_ini = models.DateField(null=True, blank=True)
    fecha_final = models.DateField(null=True, blank=True)
    doc_verif = models.CharField(max_length=500, blank=True, null=True)
    causas_desv = models.CharField(max_length=500, blank=True, null=True)
    estado = models.IntegerField(default=1)
    
    class Meta:
        db_table = 'actividad'
        verbose_name = 'Actividad'
        verbose_name_plural = 'Actividades'
        ordering = ['-fecha_ini']
    
    def __str__(self):
        return f"{self.categ_programatica} - {self.descripcion}"


