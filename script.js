const container = document.querySelector('.container');
const searchBar = document.getElementById('search-bar');
const notification = document.getElementById('notification');
const addItemBtn = document.getElementById('add-item-btn');
const addItemForm = document.getElementById('add-item-form');
const submitNewItemBtn = document.getElementById('submit-new-item');
const cancelNewItemBtn = document.getElementById('cancel-new-item');

const data = [
    { text: "Contoh biaya produksi", file: "Contoh Biaya produksi.xlsx" },
    // Tambahkan item lainnya sesuai dengan struktur folder dan nama filenya
];

function showNotification(message, status) {
    notification.textContent = message;
    notification.classList.add('notification', status);
    notification.style.display = 'block';

    setTimeout(() => {
        notification.textContent = '';
        notification.classList.remove('notification', status);
        notification.style.display = 'none';
    }, 3000);
}

function createCardView(item) {
    const card = document.createElement('div');
    card.classList.add('card');

    const fileName = document.createElement('p');
    fileName.textContent = item.text;
    card.appendChild(fileName);

    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = getFileType(item.file) === 'pdf' ? 'View' : 'Download';
    downloadBtn.style.backgroundColor = getFileType(item.file) === 'pdf' ? '#3498db' : '#2ecc71';
    downloadBtn.addEventListener('click', () => {
        handleFile(item.file);
    });
    card.appendChild(downloadBtn);

    container.appendChild(card);
}

function getFileType(file) {
    return file.split('.').pop().toLowerCase();
}

function handleFile(file) {
    const extension = getFileType(file);
    if (extension === 'pdf') {
        viewPDF(file);
    } else {
        downloadFile(file);
    }
}

function viewPDF(file) {
    window.open(file, '_blank');
}

function downloadFile(file) {
    const link = document.createElement('a');
    link.href = file;
    link.download = file.split('/').pop();
    link.target = '_blank';
    link.click();
}

function showNotFoundMessage() {
    const message = document.createElement('div');
    message.textContent = "File tidak ditemukan";
    message.classList.add('not-found');
    container.appendChild(message);
}

function clearContainer() {
    container.innerHTML = '';
}

searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredData = data.filter(item => item.text.toLowerCase().includes(searchTerm));

    clearContainer();

    if (filteredData.length === 0) {
        showNotFoundMessage();
    } else {
        filteredData.forEach(createCardView);
    }
});

addItemBtn.addEventListener('click', () => {
    addItemForm.style.display = 'block';
});

submitNewItemBtn.addEventListener('click', () => {
    const newItemText = document.getElementById('new-item-text').value;
    const newItemFile = document.getElementById('new-item-file').files[0];

    if (newItemText && newItemFile) {
        const newItem = { text: newItemText, file: URL.createObjectURL(newItemFile) };
        data.push(newItem);
        createCardView(newItem);
        addItemForm.style.display = 'none';
        showNotification('Item baru berhasil ditambahkan', 'success');
    } else {
        showNotification('Harap isi semua kolom', 'error');
    }
});

cancelNewItemBtn.addEventListener('click', () => {
    addItemForm.style.display = 'none';
    document.getElementById('new-item-text').value = '';
    document.getElementById('new-item-file').value = null;
    showNotification('Penambahan item baru dibatalkan', 'error');
});
