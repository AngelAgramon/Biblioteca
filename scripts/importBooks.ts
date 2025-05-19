import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

interface BookData {
  id_libro: string;
  unidad: number;
  titulo: string;
  autor: string;
  clasificacion: string;
}

interface CSVRecord {
  id_libro: string;
  Unidad: string;
  Titulo: string;
  Autor: string;
  Clasificacion: string;
}

async function parseCSV(filePath: string): Promise<BookData[]> {
  console.log('Leyendo archivo CSV:', filePath);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  console.log('Contenido del archivo:', fileContent);

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
  
  console.log('Registros encontrados en CSV:', records);

  const books: BookData[] = [];
  
  records.forEach((record: CSVRecord) => {
    console.log('Procesando registro:', record);
    const cantidadCopias = parseInt(record.Unidad);
    console.log('Cantidad de copias:', cantidadCopias);
    
    // Crear un registro por cada copia del libro
    for (let i = 0; i < cantidadCopias; i++) {
      books.push({
        id_libro: `${record.id_libro}-${i + 1}`, // Agregamos un sufijo para identificar cada copia
        unidad: 1, // Cada registro representa una copia individual
        titulo: record.Titulo,
        autor: record.Autor,
        clasificacion: record.Clasificacion
      });
    }
  });

  console.log('Libros procesados:', books);
  return books;
}

async function importBooks(filePath: string) {
  try {
    console.log('Borrando todos los préstamos existentes...');
    await prisma.loan.deleteMany({});
    console.log('Préstamos borrados exitosamente');

    console.log('Borrando todos los libros existentes...');
    await prisma.book.deleteMany({});
    console.log('Libros borrados exitosamente');

    console.log('Iniciando importación de libros...');
    const books = await parseCSV(filePath);
    
    console.log(`Se encontraron ${books.length} copias de libros para importar`);
    
    for (const book of books) {
      try {
        await prisma.book.create({
          data: book
        });
        console.log(`Libro importado: ${book.titulo} (ID: ${book.id_libro})`);
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
const csvPath = process.argv[2];
if (!csvPath) {
  console.error('Por favor, proporciona la ruta al archivo CSV como argumento');
  process.exit(1);
}

importBooks(csvPath); 