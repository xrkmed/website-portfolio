import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

window.addEventListener('load', event => {
    load();

    async function load(){
    const octokit = new Octokit({});
      
     var result = await octokit.request('GET /users/{username}', {
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
      }

      if(gitBio){
        gitBio.innerHTML = `“<small>` + result.data.bio + `</small>”`;
      }

      if(gitProfile){
        gitProfile.src = result.data.avatar_url;
      }
      console.log(result);
      document.querySelector('.git_button').href = result.data.html_url
    }

    let totalCommits = 0;
    result = await octokit.request('GET /users/{username}/events', {
        username: 'xrkmed'
      })

      if(result.status == 200){
        for(event in result.data){
            if(result.data[event].type == "PushEvent"){
                ++totalCommits;
            }
        }

        let descriptionProfile = document.querySelector('#git_bioApi');
        descriptionProfile.innerHTML += "</br><strong>" + totalCommits + "</strong> commits."; 
      }

    }
});