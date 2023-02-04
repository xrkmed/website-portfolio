export default class Tooltip {
    static enabled = false;

    static activate() {
        document.body.insertAdjacentHTML("beforeend", `
        <div class="tooltip" id="tooltip" style="display: none; top: 0; left: 0;">
        </div>
        `);
    }

    static show(TOP, LEFT, Text){
        if(this.enabled){
             return;
        }

        const tooltip = document.querySelector("#tooltip");
        tooltip.style.display = null;
        tooltip.innerHTML = Text;
        tooltip.style.top=TOP;
        tooltip.style.left=LEFT;
        this.enabled = true;
    }

    static disable(){
        document.querySelector("#tooltip").style.display = 'none';
        this.enabled = false;
    }
}