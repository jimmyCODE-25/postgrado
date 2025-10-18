import graphene
import logging
from datetime import datetime
from graphene_django import DjangoObjectType
from .models import Persona, PlanFormacion, Actividad

logger = logging.getLogger(__name__)
#persona
class PersonaType(DjangoObjectType):
    class Meta:
        model = Persona
        fields = '__all__'

#planformacion
class PlanFormacionType(DjangoObjectType):
    class Meta:
        model = PlanFormacion
        fields = '__all__'
        
#actividad
class ActividadType(DjangoObjectType):
    class Meta:
        model = Actividad
        fields = '__all__'
              
class Query(graphene.ObjectType):
    # Queries para Persona
    all_personas = graphene.List(PersonaType)
    persona_by_id = graphene.Field(PersonaType, idpersona=graphene.ID(required=True))
    
    # Queries para PlanFormacion
    all_planes_formacion = graphene.List(PlanFormacionType)
    plan_formacion_by_id = graphene.Field(PlanFormacionType, id_pf=graphene.ID(required=True))
    
    #Queries para actividad
    all_actividades = graphene.List(ActividadType)
    actividad_by_id = graphene.Field(ActividadType, id_act=graphene.Int(required=True))
    
    #personas
    def resolve_all_personas(self, info):
        return Persona.objects.all()
    
    def resolve_persona_by_id(self, info, idpersona):
        try:
            pk_value = int(idpersona) if isinstance(idpersona, str) else idpersona
            return Persona.objects.get(idpersona=pk_value)
        except (Persona.DoesNotExist, ValueError):
            return None

    #planformacion
    def resolve_all_planes_formacion(self, info):
        return PlanFormacion.objects.all()
    
    def resolve_plan_formacion_by_id(self, info, id_pf):
        try:
            pk_value = int(id_pf) if isinstance(id_pf, str) else id_pf
            return PlanFormacion.objects.get(id_pf=pk_value)
        except (PlanFormacion.DoesNotExist, ValueError):
            return None
        
    #actividad
    def resolve_all_actividades(self, info):
        return Actividad.objects.all()
    
    def resolve_actividad_by_id(self, info, id_act):
        try:
            return Actividad.objects.get(id_act=id_act)
        except Actividad.DoesNotExist:
            return None   
        
        
def parse_date(value):
    if value is None:
        return None
    if isinstance(value, str):
        try:
            dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
            return dt.date()
        except ValueError:
            logger.warning(f"Invalid date format: {value}")
            return None
    elif hasattr(value,'date'):
        return value.date()
    return value

class CreatePersona(graphene.Mutation):
    class Arguments:
        nombres = graphene.String(required=True)
        apellidos = graphene.String(required=True)
        email = graphene.String(required=True)
        telefono = graphene.String()
        direccion = graphene.String()
        fecha_nacimiento = graphene.Date()
    
    persona = graphene.Field(PersonaType)
    
    def mutate(self, info, nombres, apellidos, email, telefono=None, direccion=None, fecha_nacimiento=None):
        logger.debug(f"CREATE called with: nombres={nombres}, apellidos={apellidos}, email={email}, telefono={telefono}, direccion={direccion}, fecha_nacimiento={fecha_nacimiento}")
        fecha_nacimiento = parse_date(fecha_nacimiento)
        persona = Persona(
            nombres=nombres,
            apellidos=apellidos,
            email=email,
            telefono=telefono,
            direccion=direccion,
            fecha_nacimiento=fecha_nacimiento
        )
        persona.save()
        logger.debug(f"Persona creada con idpersona: {persona.idpersona}")
        return CreatePersona(persona=persona)

class UpdatePersona(graphene.Mutation):
    class Arguments:
        idpersona = graphene.ID(required=True)
        nombres = graphene.String()
        apellidos = graphene.String()
        email = graphene.String()
        telefono = graphene.String()
        direccion = graphene.String()
        fecha_nacimiento = graphene.Date()
    
    persona = graphene.Field(PersonaType)
    
    def mutate(self, info, idpersona, **kwargs):
        try:
            pk_value = int(idpersona) if isinstance(idpersona, str) else idpersona
            persona = Persona.objects.get(idpersona=pk_value)
            updated_fields = []
            logger.debug(f"UPDATE called for id={idpersona} with kwargs={kwargs}")
            for key, value in kwargs.items():
                if value is not None:
                    # Parsear fecha
                    if key == 'fecha_nacimiento':
                        value = parse_date(value)
                    setattr(persona, key, value)
                    updated_fields.append(key)
            if updated_fields:
                persona.save()
                logger.debug(f"Updated fields for persona {idpersona}: {', '.join(updated_fields)}")
            return UpdatePersona(persona=persona)
        except Persona.DoesNotExist:
            raise graphene.GraphQLError(f"Persona con id {idpersona} no existe.")

class DeletePersona(graphene.Mutation):
    class Arguments:
        idpersona = graphene.ID(required=True)
    
    success = graphene.Boolean()
    
    def mutate(self, info, idpersona):
        try:
            pk_value = int(idpersona) if isinstance(idpersona, str) else idpersona
            persona = Persona.objects.get(idpersona=pk_value)
            persona.delete()
            logger.debug(f"Persona con id {idpersona} eliminada.")
            return DeletePersona(success=True)
        except Persona.DoesNotExist:
            logger.warning(f"Intento de eliminar persona con id {idpersona} que no existe.")
            return DeletePersona(success=False)
        
 # Mutations para PlanFormacion
class CreatePlanFormacion(graphene.Mutation):
    class Arguments:
        n_version = graphene.Int()
        nombre = graphene.String(required=True)
        nivel_acad = graphene.Int(required=True)
        total_cred = graphene.Int()
        total_periodo = graphene.Int()
        tipo_carr = graphene.Int(required=True)
        fecha_creacion = graphene.Date()
        n_resol_alta = graphene.String()
        fecha_baja = graphene.Date()
        n_resol_baja = graphene.String()
        descripcion = graphene.String()
        estado = graphene.Int(required=True)
    
    plan_formacion = graphene.Field(PlanFormacionType)
    
    def mutate(self, info, nombre, nivel_acad, tipo_carr, estado, **kwargs):
        logger.debug(f"CREATE PlanFormacion called with: nombre={nombre}, nivel_acad={nivel_acad}, tipo_carr={tipo_carr}, estado={estado}")
        
        # Parsear fechas si existen
        if 'fecha_creacion' in kwargs:
            kwargs['fecha_creacion'] = parse_date(kwargs['fecha_creacion'])
        if 'fecha_baja' in kwargs:
            kwargs['fecha_baja'] = parse_date(kwargs['fecha_baja'])
        
        plan = PlanFormacion(
            nombre=nombre,
            nivel_acad=nivel_acad,
            tipo_carr=tipo_carr,
            estado=estado,
            **kwargs
        )
        plan.save()
        logger.debug(f"PlanFormacion creado con id_pf: {plan.id_pf}")
        return CreatePlanFormacion(plan_formacion=plan)


class UpdatePlanFormacion(graphene.Mutation):
    class Arguments:
        id_pf = graphene.ID(required=True)
        n_version = graphene.Int()
        nombre = graphene.String()
        nivel_acad = graphene.Int()
        total_cred = graphene.Int()
        total_periodo = graphene.Int()
        tipo_carr = graphene.Int()
        fecha_creacion = graphene.Date()
        n_resol_alta = graphene.String()
        fecha_baja = graphene.Date()
        n_resol_baja = graphene.String()
        descripcion = graphene.String()
        estado = graphene.Int()
    
    plan_formacion = graphene.Field(PlanFormacionType)
    
    def mutate(self, info, id_pf, **kwargs):
        try:
            pk_value = int(id_pf) if isinstance(id_pf, str) else id_pf
            plan = PlanFormacion.objects.get(id_pf=pk_value)
            updated_fields = []
            logger.debug(f"UPDATE PlanFormacion called for id={id_pf} with kwargs={kwargs}")
            
            for key, value in kwargs.items():
                if value is not None:
                    # Parsear fechas
                    if key in ['fecha_creacion', 'fecha_baja']:
                        value = parse_date(value)
                    setattr(plan, key, value)
                    updated_fields.append(key)
            
            if updated_fields:
                plan.save()
                logger.debug(f"Updated fields for PlanFormacion {id_pf}: {', '.join(updated_fields)}")
            return UpdatePlanFormacion(plan_formacion=plan)
        except PlanFormacion.DoesNotExist:
            raise graphene.GraphQLError(f"PlanFormacion con id {id_pf} no existe.")


class DeletePlanFormacion(graphene.Mutation):
    class Arguments:
        id_pf = graphene.ID(required=True)
    
    success = graphene.Boolean()
    
    def mutate(self, info, id_pf):
        try:
            pk_value = int(id_pf) if isinstance(id_pf, str) else id_pf
            plan = PlanFormacion.objects.get(id_pf=pk_value)
            plan.delete()
            logger.debug(f"PlanFormacion con id {id_pf} eliminado.")
            return DeletePlanFormacion(success=True)
        except PlanFormacion.DoesNotExist:
            logger.warning(f"Intento de eliminar PlanFormacion con id {id_pf} que no existe.")
            return DeletePlanFormacion(success=False)       

#actividad
class CreateActividad(graphene.Mutation):
    class Arguments:
        categ_programatica = graphene.String(required=True)
        descripcion = graphene.String()
        id_acp = graphene.Int()
        id_pr = graphene.Int()
        n_actividad = graphene.Int()
        id_ue = graphene.Int()
        tipo = graphene.String()
        clase = graphene.String()
        unidad_medida = graphene.String()
        fecha_ini = graphene.Date()
        fecha_final = graphene.Date()
        doc_verif = graphene.String()
        causas_desv = graphene.String()
        estado = graphene.Int()
    
    actividad = graphene.Field(ActividadType)
    
    def mutate(self, info, categ_programatica, **kwargs):
        actividad = Actividad(
            categ_programatica=categ_programatica,
            descripcion=kwargs.get('descripcion'),
            id_acp=kwargs.get('id_acp'),
            id_pr=kwargs.get('id_pr'),
            n_actividad=kwargs.get('n_actividad'),
            id_ue=kwargs.get('id_ue'),
            tipo=kwargs.get('tipo'),
            clase=kwargs.get('clase'),
            unidad_medida=kwargs.get('unidad_medida'),
            fecha_ini=kwargs.get('fecha_ini'),
            fecha_final=kwargs.get('fecha_final'),
            doc_verif=kwargs.get('doc_verif'),
            causas_desv=kwargs.get('causas_desv'),
            estado=kwargs.get('estado', 1)
        )
        actividad.save()
        return CreateActividad(actividad=actividad)


class UpdateActividad(graphene.Mutation):
    class Arguments:
        id_act = graphene.Int(required=True)
        categ_programatica = graphene.String()
        descripcion = graphene.String()
        id_acp = graphene.Int()
        id_pr = graphene.Int()
        n_actividad = graphene.Int()
        id_ue = graphene.Int()
        tipo = graphene.String()
        clase = graphene.String()
        unidad_medida = graphene.String()
        fecha_ini = graphene.Date()
        fecha_final = graphene.Date()
        doc_verif = graphene.String()
        causas_desv = graphene.String()
        estado = graphene.Int()
    
    actividad = graphene.Field(ActividadType)
    
    def mutate(self, info, id_act, **kwargs):
        try:
            actividad = Actividad.objects.get(id_act=id_act)
            for key, value in kwargs.items():
                if value is not None:
                    setattr(actividad, key, value)
            actividad.save()
            return UpdateActividad(actividad=actividad)
        except Actividad.DoesNotExist:
            return None


class DeleteActividad(graphene.Mutation):
    class Arguments:
        id_act = graphene.Int(required=True)
    
    success = graphene.Boolean()
    
    def mutate(self, info, id_act):
        try:
            actividad = Actividad.objects.get(id_act=id_act)
            actividad.delete()
            return DeleteActividad(success=True)
        except Actividad.DoesNotExist:
            return DeleteActividad(success=False)
        
        
class Mutation(graphene.ObjectType):
    create_persona = CreatePersona.Field()
    update_persona = UpdatePersona.Field()
    delete_persona = DeletePersona.Field()
    
    # Mutations de PlanFormacion
    create_plan_formacion = CreatePlanFormacion.Field()
    update_plan_formacion = UpdatePlanFormacion.Field()
    delete_plan_formacion = DeletePlanFormacion.Field()
    
    # Mutations de Actividad
    create_actividad = CreateActividad.Field()
    update_actividad = UpdateActividad.Field()
    delete_actividad = DeleteActividad.Field()
schema = graphene.Schema(query=Query, mutation=Mutation)

