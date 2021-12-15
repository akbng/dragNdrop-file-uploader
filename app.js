const canvas = document.getElementById("preview");
const ctx = canvas.getContext("2d");
const container = document.getElementById("container");

async function dropHandler(ev) {
  console.log("File(s) dropped");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === "file") {
        var file = ev.dataTransfer.items[i].getAsFile();
        console.log("... file[" + i + "].name = " + file.name);
        // canvas.src = URL.createObjectURL(file);

        // console.log(file.stream());
        const reader = new FileReader();

        reader.onload = (event) => {
          const image = new Image();
          image.onload = () => {
            // const [width, height] = clampDimensions(image.width, image.height);
            const { width, height } = image;
            // canvas.width = width;
            // canvas.height = height;
            image.width = 300;
            image.height = 120;
            container.appendChild(image);
            console.log(image);
            // ctx.drawImage(image, 0, 0, width, height);
          };
          image.src = event.target.result;
        };
        reader.readAsDataURL(file);
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

function dragOverHandler(ev) {
  console.log("File(s) in drop zone");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}
