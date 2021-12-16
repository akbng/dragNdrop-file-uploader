const container = document.querySelector(".image_container");
const dropZone = document.querySelector(".drop_zone");

let MAXIMUM_WIDTH = 0.85 * window.innerWidth - 50;
let MAXIMUM_HEIGHT = 0.6 * window.innerHeight - 50;

const adjustDimension = (e) => {
  MAXIMUM_WIDTH = 0.85 * window.innerWidth - 50;
  MAXIMUM_HEIGHT = 0.6 * window.innerHeight - 50;
};

window.addEventListener("resize", adjustDimension);

const clampDimensions = (width, height) => {
  if (height > MAXIMUM_HEIGHT) {
    const reducedWidth = Math.floor((width * MAXIMUM_HEIGHT) / height);
    return [reducedWidth, MAXIMUM_HEIGHT];
  }

  if (width > MAXIMUM_WIDTH) {
    const reducedHeight = Math.floor((height * MAXIMUM_WIDTH) / width);
    return [MAXIMUM_WIDTH, reducedHeight];
  }

  return [width, height];
};

const appendImage = (file) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const image = new Image();
    image.onload = () => {
      const [width, height] = clampDimensions(image.width, image.height);
      image.width = width;
      image.height = height;
      container.appendChild(image);
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
};

async function dropHandler(ev) {
  dropZone.classList.remove("dropping");
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === "file") {
        var file = ev.dataTransfer.items[i].getAsFile();
        console.log("... file[" + i + "].name = " + file.name);

        appendImage(file);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log(
        "... file[" + i + "].name = " + ev.dataTransfer.files[i].name
      );
    }
  }
}

const dragOverHandler = (e) => {
  dropZone.classList.add("dropping");
  e.preventDefault();
};

const dragEnterHandler = (e) => {
  e.preventDefault();
  dropZone.classList.add("dropping");
};

const dragleaveHandler = (e) => {
  e.preventDefault();
  dropZone.classList.remove("dropping");
};

dropZone.addEventListener("dragover", dragOverHandler);
dropZone.addEventListener("drop", dropHandler);
dropZone.addEventListener("dragenter", dragEnterHandler);
dropZone.addEventListener("dragleave", dragleaveHandler);
