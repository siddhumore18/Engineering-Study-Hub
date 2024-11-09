const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const multer = require('multer'); 
const path = require('path');
const fs = require('fs');


const app = express();
const port = 3000;

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log('Created uploads directory');
}

// MongoDB connection string
const mongoURI = 'mongodb+srv://srmore125125:Siddhu236810@cluster0.j8y7e.mongodb.net/engineering_study_hub?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// (Continue with your schema and routes as usual)

// Define User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    universityId: String,
    userType: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log current working directory and full path to public folder
console.log('Current working directory:', process.cwd());
const publicPath = path.join(__dirname, 'public');
console.log('Full path to public folder:', publicPath);

// Check if public folder exists
if (fs.existsSync(publicPath)) {
    console.log('Public folder exists');
} else {
    console.log('Public folder does not exist');
}

// Check if index.html exists
const indexPath = path.join(publicPath, 'index.html');
if (fs.existsSync(indexPath)) {
    console.log('index.html exists');
} else {
    console.log('index.html does not exist');
}

app.use(express.static(publicPath));

// Routes
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password, universityId, userType } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            universityId,
            userType
        });
        await user.save();
       res.redirect('/login.html');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid password');
        }

        // Redirect based on userType
        if (user.userType === 'university') {
            res.redirect('/upload.html');  // Redirect to upload page if university
        } else if (user.userType === 'student') {
            res.redirect('/index.html');   // Redirect to index page if student
        } else {
            res.status(400).send('Invalid user type');
        }
        console.log("login ok");
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});


// MongoDB connection string
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Define Schema
const fileSchema = new mongoose.Schema({
    filename: String,
    filepath: String,
    type: String,      // 'video' or 'pdf'
    semester: String,   // e.g., 'semester1'
    subject: String,
    university: String, // University name
    likes: { type: Number, default: 0 }
});
const File = mongoose.model('File', fileSchema);
// Serve the uploads folder as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});


const upload = multer({ storage });

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for uploading files
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // Log request body and file info
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { type, semester, subject, university } = req.body;
        
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const newFile = new File({
            filename: req.file.filename,
            filepath: `/uploads/${req.file.filename}`,
            type,
            semester,
            subject,
            university
        });
        
        // Save the file metadata to MongoDB
        await newFile.save();
        console.log('File saved to MongoDB:', newFile);

        res.redirect('/upload.html');
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
    }
});


// Route to fetch videos by semester for index.html
app.get('/videos/:semester', async (req, res) => {
    try {
        const { semester } = req.params;
        const videos = await File.find({ type: 'video', semester });
        res.json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).send('Error fetching videos');
    }
});

// Route to fetch PDFs by semester for pdf.html
app.get('/pdfs/:semester', async (req, res) => {
    try {
        const { semester } = req.params;
        const pdfs = await File.find({ type: 'pdf', semester });
        res.json(pdfs);
    } catch (error) {
        console.error('Error fetching PDFs:', error);
        res.status(500).send('Error fetching PDFs');
    }
});

// Route to like a PDF
app.post('/likePdf/:id', async (req, res) => {
    try {
        const pdfId = req.params.id;
        const pdf = await File.findById(pdfId);
        if (pdf && pdf.type === 'pdf') {
            pdf.likes += 1;
            await pdf.save();
            res.json({ message: 'PDF liked successfully!' });
        } else {
            res.status(404).send('PDF not found');
        }
    } catch (error) {
        console.error('Error liking PDF:', error);
        res.status(500).send('Error liking PDF');
    }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

