// Sample data structure for files
const files = {

  semester1: [
    { name: "File 1", type: "PDF", path: "path/to/file1.pdf" },
    { name: "File 2", type: "PPT", path: "path/to/file2.ppt" },
    { name: "File 3", type: "PPT", path: "path/to/file3.ppt" },
    { name: "File 4", type: "PPT", path: "path/to/file4.ppt" },
    { name: "File 5", type: "PPT", path: "path/to/file5.ppt" },

    // Add more files as needed
  ],
  semester2: [
    { name: "File 6", type: "PDF", path: "path/to/file3.pdf" },
    { name: "File 7", type: "PDF", path: "path/to/file4.pdf" },
    { name: "File 8", type: "PPT", path: "path/to/file6.ppt" },
    { name: "File 9", type: "PPT", path: "path/to/file7.ppt" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    
    // Add more files as needed
  ],
  // Add data for other semesters and question papers
  semester3: [
    { name: "File 3", type: "PDF", path: "path/to/file3.pdf" },
    { name: "File 4", type: "PDF", path: "path/to/file4.pdf" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    // Add more files as needed
  ],
  semester4: [
    { name: "File 3", type: "PDF", path: "path/to/file3.pdf" },
    { name: "File 4", type: "PDF", path: "path/to/file4.pdf" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    // Add more files as needed
  ],
  semester5: [
    { name: "File 3", type: "PDF", path: "path/to/file3.pdf" },
    { name: "File 4", type: "PDF", path: "path/to/file4.pdf" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    // Add more files as needed
  ],
  semester6: [
    { name: "File 3", type: "PDF", path: "path/to/file3.pdf" },
    { name: "File 4", type: "PDF", path: "path/to/file4.pdf" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    // Add more files as needed
  ],
  semester7: [
    { name: "File 3", type: "PDF", path: "path/to/file3.pdf" },
    { name: "File 4", type: "PDF", path: "path/to/file4.pdf" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    { name: "File 10", type: "PPT", path: "path/to/file8.ppt" },
    // Add more files as needed
  ],
};

// Function to populate file list
function populateFileList(sectionId, fileList) {
  const ul = document.getElementById(sectionId);
  fileList.forEach(file => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="file-type">${file.type}</span><a href="${file.path}" download>${file.name}</a>`;
    ul.appendChild(li);
  });
}

// Populate all sections
document.addEventListener('DOMContentLoaded', () => {

  populateFileList('semester1', files.semester1);
  populateFileList('semester2', files.semester2);
  populateFileList('semester3', files.semester3);
  populateFileList('semester4', files.semester4);
  populateFileList('semester5', files.semester5);
  populateFileList('semester6', files.semester6);
  populateFileList('semester7', files.semester7);

  // Call populateFileList for other semesters and question papers
});