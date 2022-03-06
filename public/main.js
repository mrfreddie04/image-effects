async function init() {
  let rustApp = null;

  try {
    rustApp = await import("../pkg");
  } catch(e) {
    console.error(e);
    return;
  }

  console.log("RUST",rustApp);

  const input = document.querySelector("#upload");
  const img = document.querySelector("#new-img");
  const fileReader = new FileReader();

  fileReader.onloadend = () => {
    const base64 = fileReader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/,"");
    const img_data_url = rustApp.grayscale(base64);
    //img.setAttribute("src", URL.createObjectURL(img_data_url)); 
    img.setAttribute("src", img_data_url); 
  };

  input.addEventListener("change", (event)=>{
    fileReader.readAsDataURL(input.files[0]);
  });
}

init();