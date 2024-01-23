const BOX = document.getElementById("box");
const INFO_NAZWA = document.getElementById("image_nazwa");
const INFO_ID = document.getElementById("image_id");
const INFO_size = document.getElementById("image_rozmiar");
const INFO_comment = document.getElementById("image_kom");

INFO_comment.value = "";

let image_boxes = [];
let tmpName = "";
let tmpSize = "";
let aktualneID = -1; //zadnego zdjecia poczatkowo nie wybiera => id < 0


function KomentarzChange()
{   
    if(aktualneID >= 0)
    {
        image_boxes[aktualneID].comment = INFO_comment.value;
        document.getElementById("image_potwierdzenie").textContent = "[V] ZAKTUALIZOWANO KOMENTARZ";
    }
    else
    INFO_comment.value = "";
}

function PotwierdzenieOff()
{
    if(aktualneID >= 0) document.getElementById("image_potwierdzenie").textContent = "";
}

function AddImage()
{    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image';
    input.multiple = true;
    input.addEventListener('change', (event) =>{
    
        const files = event.target.files;
        if(files.length === 0 )
        {
            alert("Nie wybrano żadnych zdjęć!");
        }
        else
        {
            for(let i = 0; i < files.length; i++)
            {
                tmpName = files[i].name;
                tmpSize = files[i].size;
                CreateImage();
            }
        }
    });
    
    input.click();
}


function CreateImage()
{
    const image_box = document.createElement("div");
    image_box.classList.add("image_box");

    const image = document.createElement("img");
    image.classList.add("fotage");
    image.src = 'grafika/'+tmpName;
    
    image_box.id = image_boxes.length;
    image_box.size = image.size;
    image_box.nazwa = tmpName;
    image_box.rozmiar = tmpSize;
    image_box.comment = "";

    //image click
    image_box.addEventListener("click", function () {
        INFO_NAZWA.textContent = "Nazwa: " + image_box.nazwa;
        INFO_ID.textContent = "ID: " + image_box.id;
        aktualneID = image_box.id;

        if(image_box.rozmiar < 1024000)
        INFO_size.textContent = "Rozmiar: " + parseInt(image_box.rozmiar/1024) + " KB";
        else
        INFO_size.textContent = "Rozmiar: " + parseFloat(image_box.rozmiar/1024) + " MB";

        PotwierdzenieOff();
        INFO_comment.value = image_box.comment;
    });

    image_boxes.push(image_box);

    BOX.appendChild(image_box);
    image_box.appendChild(image);
}