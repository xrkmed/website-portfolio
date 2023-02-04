export default class Lightbox{
    static activate(){
        document.body.insertAdjacentHTML("beforeend", `
        <div class="lightbox" id="lightbox" style="display: none;">
            <div class="lightbox__inner">
                <div class="lightbox__content">
                </div>
                <div class="lightbox__options">
                    <button type="button" class="btnClose">
                        &times;
                    </button>
                </div>
            </div>
        </div>
        `);


        const lightbox = document.querySelector("#lightbox");
        const lightBox_options = lightbox.querySelector(".lightbox__options");
        const btnClose = lightBox_options.querySelector(".btnClose");
        const content = lightbox.querySelector(".lightbox__content");


        const close = () => {
            lightbox.style.display = 'none';
            content.innerHTML = '';
        }

        btnClose.addEventListener("click", () => {
            close();
        });

        lightbox.addEventListener("mousedown", e => {
            if(e.target.matches("#lightbox")){
                close();
            }
        });
    }


    static show(content){
        const lightBox = document.querySelector('#lightbox .lightbox__content');

        document.querySelector("#lightbox").style.display = null;
        if(typeof content === "string"){
            lightBox.innerHTML = content;
        }else{
            lightBox.innerHTML = '';
            lightBox.appendChild(content);
        }
    }
}