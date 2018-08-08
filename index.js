function getRepositories(){
  username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos')
  req.send()


}


function displayRepositories(){
  var repos = JSON.parse(this.responseText)
  // const repoNames = repos.map(r=> r.html_url)
  const repoNames = `<ul> ${repos.map(r => '<li> <h3><a href ='+r.html_url+'>' + r.name + '</h3></a> <a href ="#" data-repo="' + r.name + '" onclick="getCommits(this)"> Commits </a></li>').join('')}</ul>`

  document.getElementById('repositories').innerHTML = repoNames
}


function getCommits(el){
  const repo = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username +  "/" + repo + '/commits')
  req.send()
}

function displayCommits(){
  var commits = JSON.parse(this.responseText)
  var commitsList = `<ul>${commits.map(c=> '<li>' + c.commit.committer.name +' - '+ c.commit.message + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = commitsList
}

function getBranches(){
  
}
