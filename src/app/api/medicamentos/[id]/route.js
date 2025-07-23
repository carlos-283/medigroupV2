import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient()

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);

    const body = await request.json();
    const { nombre, categoria, cantidad, fecha_expiracion } = body;

    const existe = await prisma.medicamentos.findUnique({
      where:
        { id }
    })

    if (!existe) {
      return new Response(JSON.stringify("No se encontro un elemento con el id proporcionado"), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updated = await prisma.medicamentos.update({
      where: { id },
      data: {
        nombre,
        categoria,
        cantidad,
        fecha_expiracion: fecha_expiracion ? new Date(fecha_expiracion) : undefined,
      },
    });

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request, { params }) {

  const id = parseInt(params.id);

  try {

    const existe = await prisma.medicamentos.findUnique({
      where:
        { id }
    })

    if (!existe) {
      return new Response(JSON.stringify("No se encontro un elemento con el id proporcionado"), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const deleted = await prisma.medicamentos.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deleted), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {

    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(request, { params }) {

  try {

    const id = parseInt((await params).id);

    const med = await prisma.medicamentos.findUnique({
      where:{ id }
    })

    if(!med)
    return new Response("No se encontro un elemento con el id proporcionado" , {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });


    return new Response(JSON.stringify(med), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {

    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}