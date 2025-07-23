import { PrismaClient } from '../../../generated/prisma'

const prisma = new PrismaClient()

export async function GET(request, { query }) {

  const { searchParams } = new URL(request.url);
  const nombre = searchParams.get('nombre');
  const categoria = searchParams.get('categoria');
  const fecha_expiracion = searchParams.get('fecha_expiracion');

  const where = {};

  if (nombre) {
    where.nombre = {
      contains: nombre
    }
  }


  if (categoria) {
    where.categoria = categoria
  }

  if (fecha_expiracion) {

    const curentDate = new Date(fecha_expiracion);
    const nextDate = new Date(curentDate);
    nextDate.setDate(curentDate.getDate() + 1);

    where.fecha_expiracion = {
      gte: curentDate,
      lt: nextDate
    }

  }

  const meds = await prisma.medicamentos.findMany({
    where
  })

  return new Response(JSON.stringify(meds), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request) {
  try {
    const body = await request.json();

    const { nombre, categoria, cantidad, fecha_expiracion } = body;

    const nuevoMed = await prisma.medicamentos.create({
      data: {
        nombre,
        categoria,
        cantidad,
        fecha_expiracion: new Date(fecha_expiracion)
        ,
      },
    });

    return new Response(JSON.stringify(nuevoMed), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


