function ImportUbuntu() {
    const link = document.createElement("link");

    link.setAttribute("href", "https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap");
    link.setAttribute("rel", "stylesheet");

    document.head.appendChild(link);
}

function ImportRubik() {
    const link = document.createElement("link");

    link.setAttribute("href", "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap");
    link.setAttribute("rel", "stylesheet");

    document.head.appendChild(link);
}

function ImportRighteous() {
    const link = document.createElement("link");

    link.setAttribute("href", "https://fonts.googleapis.com/css2?family=Righteous&display=swap");
    link.setAttribute("rel", "stylesheet");

    document.head.appendChild(link);
}

export default function ImportFonts() {
    ImportUbuntu();
    ImportRubik();
    ImportRighteous();
}

