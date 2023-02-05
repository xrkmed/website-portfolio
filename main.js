import Lightbox from './assets/js/lightbox.js';
import Tooltip from './assets/js/tooltip.js';
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

Tooltip.activate();
Lightbox.activate();

window.addEventListener('load', event => {
    load();

    let loadedList = new Array();
    loadedList["projects"] = false;
    loadedList["commits"] = false;

    async function load(){
    const octokit = new Octokit({
        auth: '' //não necessita de TOKEN pois é uma chamada simples.
      })
      
     const result = await octokit.request('GET /users/{username}', {
        username: 'xrkmed'
      })

      if(result.status == 200){
        document.querySelector('#loadingGithub').style = "visibility: collapse; display: none;";
        document.querySelector('#githubSucessfully').style = "visibility: visible;";

      let descriptionProfile = document.querySelector('#git_bioApi');
      let gitBio = document.querySelector('#git_bio');
      let gitProfile = document.querySelector('#git_profileImg');

      if(descriptionProfile){
        descriptionProfile.innerHTML = "<strong> " + result.data.public_repos + "</strong> public projects.</br>📍 - " + result.data.location + ".";
        loadedList["projects"] = true;
      }

      if(gitBio){
        gitBio.innerHTML = `“<small>` + result.data.bio + `</small>”`;
        loadedList["commits"] = true;
      }

      if(gitProfile){
        gitProfile.src = result.data.avatar_url;
      }

      document.querySelector('.git_button').href = result.data.html_url
    }


    }
});

let projects = document.querySelectorAll('.projectType');
for(let i = 0; i < projects.length; ++i){
    projects[i].addEventListener('mouseenter', e => {
        if(!projects[i].over){            
            projects[i].children[1].oldColor = projects[i].children[1].style.color;
            projects[i].children[1].style.color = "#a3a3a3";

            projects[i].over = true;
        }
    });

    projects[i].addEventListener('mouseleave', e => {
        if(projects[i].over){
            projects[i].over = false;

            projects[i].children[1].style.color = projects[i].children[1].oldColor;
        }
    });
}

window.addEventListener('onscrollchange', event => {
    Tooltip.disable();
});

let iconsTooltip = document.querySelectorAll('.experienciasIcon .linguaIcon');
for(let i = 0; i < iconsTooltip.length; ++i){
    iconsTooltip[i].addEventListener('mouseenter', e => {
        if(!iconsTooltip[i].over){            
            iconsTooltip[i].over = true;
            Tooltip.show(iconsTooltip[i].getBoundingClientRect().top+(iconsTooltip[i].getBoundingClientRect().top*12/100)+(window.scrollY/10), iconsTooltip[i].getBoundingClientRect().left, iconsTooltip[i].getAttribute("tooltip"));
        }
    });

    iconsTooltip[i].addEventListener('mouseleave', e => {
        if(iconsTooltip[i].over){
            iconsTooltip[i].over = false;

            Tooltip.disable();

        }
    });
}

document.querySelector('#sobremim').addEventListener('click', () => {
    $.get("./pages/myself.html", function(data){
        Lightbox.show(data);
    

        window.addEventListener("keydown", e => {
            if(lightbox.style.display != "none"){        
                if(e.key === "Escape"){
                    document.querySelector("#lightbox").style.display = 'none';
                }
            }
        });
    });
});

document.querySelector('#cursosButton').addEventListener('click', () => {
let lastCurso = 0;

function updateLastCurso(value){
    lastCurso = value;

    let totalCursos = document.querySelectorAll('.focusCurso a').length;
    document.querySelector('#curso_button_label').innerHTML = "<strong>"+(lastCurso+1)+"/"+totalCursos+"</strong>";

    if(value == 0){
        document.querySelector('#curso_button_back').style.visibility = "hidden";
    }else{
        document.querySelector('#curso_button_back').style.visibility = "visible";
    }

    if((value+1) == totalCursos){
        document.querySelector('#curso_button_next').style.visibility = "hidden";
    }else{
        document.querySelector('#curso_button_next').style.visibility = "visible";
    }
}

$.get("./pages/cursos.html", function(data){
    Lightbox.show(data);

    const list = document.querySelectorAll(".focusCurso a");
    updateLastCurso(0);

    document.querySelector("#curso_button_back").addEventListener('click', () => {
        if(lastCurso-1 >= 0){
            list[lastCurso].style.visibility = "collapse";
            list[lastCurso].style.position = "fixed";

            list[lastCurso-1].style.visibility = "visible";
            list[lastCurso-1].style.position = "relative";
            updateLastCurso(lastCurso-1);
        }
    });
    
    document.querySelector("#curso_button_next").addEventListener('click', () => {
            if(lastCurso+1 < list.length){
                list[lastCurso].style.visibility = "collapse";
                list[lastCurso].style.position = "fixed";

                list[lastCurso+1].style.visibility = "visible";
                list[lastCurso+1].style.position = "relative";
                updateLastCurso(lastCurso+1);
            }
    });
});

const lightbox = document.querySelector("#lightbox");

window.addEventListener("keydown", e => {
    if(lightbox.style.display != "none"){
        const list = document.querySelectorAll(".focusCurso a");

        if(e.key === "ArrowLeft"){
            if(lastCurso-1 >= 0){
                list[lastCurso].style.visibility = "collapse";
                list[lastCurso].style.position = "fixed";

                list[lastCurso-1].style.visibility = "visible";
                list[lastCurso-1].style.position = "relative";
                updateLastCurso(lastCurso-1);
            }
        }else if(e.key === "ArrowRight"){
            if(lastCurso+1 < list.length){
                list[lastCurso].style.visibility = "collapse";
                list[lastCurso].style.position = "fixed";

                list[lastCurso+1].style.visibility = "visible";
                list[lastCurso+1].style.position = "relative";
                updateLastCurso(lastCurso+1);
            }
        }else if(e.key === "Escape"){
            document.querySelector("#lightbox").style.display = 'none';
        }
    }
});


});