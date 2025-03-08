import { NextResponse } from 'next/server';

const fs = require('fs-extra');

import formidable from 'formidable';

import path from 'path';

const getImage = async (localFilePath, emptyPath) => {

        let indivFile;

        let emptyPhotoPath = path.join(emptyPath, 'empty-photo.jpg');

        if (!fs.existsSync(localFilePath)) {
            fs.mkdirSync(localFilePath)
        }

        fs.readdirSync(localFilePath).forEach(file => {
            indivFile = path.join(localFilePath, file);
        });

        try {
            // Read the image file
            const imageBuffer = await fs.readFile(indivFile);
            
            // Create a response with the image buffer and set the appropriate headers
            return new NextResponse(imageBuffer, {
              headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': imageBuffer.length.toString(),
              },
            });
          } catch (error) {
            
            let emptyPhotoBuffer = await fs.readFile(emptyPhotoPath);

            return new NextResponse(emptyPhotoBuffer, {
                headers: {
                  'Content-Type': 'image/jpeg',
                  'Content-Length': emptyPhotoBuffer.length.toString(),
                },
              });


            // Handle errors, such as the file not existing

            return new NextResponse('Image not found', { status: 404 });
          }

}

const createUsersFolderUponRegister = (id) => {

  const imageDirectory = path.join(process.cwd(), '/public/users/');
  
  const ImgFolderLocale = path.join(imageDirectory, id.toString());
  
  if (!fs.existsSync(ImgFolderLocale)) {
    fs.mkdirSync(ImgFolderLocale)
  }

  return;
}

// const uploadImage = async () => {

//   const form = new formidable.IncomingForm();
//   form.uploadDir = path.join(process.cwd(), 'public/uploads');
//   form.keepExtensions = true;

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       res.status(500).json({ error: 'Error parsing the files' });
//       return;
//     }
//     const file = files.image;
//     const newPath = path.join(form.uploadDir, file.newFilename);

//     fs.rename(file.filepath, newPath, (err) => {
//       if (err) {
//         res.status(500).json({ error: 'Error saving the file' });
//         return;
//       }
//       res.status(200).json({ message: 'File uploaded successfully', path: `/uploads/${file.newFilename}` });
//     });
//   });


// }

module.exports = {
    getImage,
    createUsersFolderUponRegister
}