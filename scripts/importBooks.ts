import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import pdf from 'pdf-parse';

const prisma = new PrismaClient();

interface BookData {
  id_libro: string;
  unidad: number;
  titulo: string;
  autor: string;
  clasificacion: string;
}

async function parsePDF(filePath: string): Promise<BookData[]> {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  
  // Dividir el texto en líneas
  const lines = data.text.split('\n');
  const books: BookData[] = [];

  // Ignorar la primera línea (encabezados)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Dividir la línea en partes usando espacios como separadores
    const parts = line.split(/\s+/);
    
    if (parts.length >= 5) {
      // El título puede contener espacios, así que necesitamos un manejo especial
      const id_libro = parts[0];
      const unidad = parseInt(parts[1]);
      
      // Encontrar el índice donde comienza la clasificación (últimos dos elementos)
      const clasificacion = parts[parts.length - 2] + ' ' + parts[parts.length - 1];
      const autor = parts[parts.length - 3];
      
      // Todo lo que está entre el título y el autor es el título
      const titulo = parts.slice(2, parts.length - 3).join(' ');

      books.push({
        id_libro,
        unidad,
        titulo,
        autor,
        clasificacion
      });
    }
  }

  return books;
}

async function importBooks(filePath: string) {
  try {
    console.log('Iniciando importación de libros...');
    const books = await parsePDF(filePath);
    
    console.log(`Se encontraron ${books.length} libros para importar`);
    
    for (const book of books) {
      try {
        await prisma.book.create({
          data: book
        });
        console.log(`Libro importado: ${book.titulo}`);
      } catch (error) {
        console.error(`Error al importar libro ${book.id_libro}:`, error);
      }
    }
    
    console.log('Importación completada exitosamente');
  } catch (error) {
    console.error('Error durante la importación:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar la importación
const pdfPath = process.argv[2];
if (!pdfPath) {
  console.error('Por favor, proporciona la ruta al archivo PDF como argumento');
  process.exit(1);
}

importBooks(pdfPath); 