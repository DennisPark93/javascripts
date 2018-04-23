// TODO: add client side code for single page application


function main() {
  const req = new XMLHttpRequest();
  const url = 'http://localhost:3000/api/messages';
  let finaltable;
  let first = 1;
    req.open('GET',url, true);

    req.addEventListener('load', function(evt) {
    	if (req.status >= 200 && req.status < 400){

    		const reviews = JSON.parse(req.responseText);
        if(first ===1){
        finaltable = reviews;
        first++;
        let tb = document.getElementById('content').getElementsByTagName('tbody')[0];
        for(let i=0; i<reviews.length; i++){
          let tr = document.createElement('tr');
          let name = document.createElement('td');
          name.textContent = reviews[i].name;
          tr.appendChild(name);

          let semester = document.createElement('td');
          semester.textContent = reviews[i].semester;
          tr.appendChild(semester);

          let year = document.createElement('td');
          year.textContent = reviews[i].year;
          tr.appendChild(year);

          // let professor = document.createElement('td');
          // professor.textContent = reviews[i].professor;
          // tr.appendchild(professor);

          let review = document.createElement('td');
          review.textContent = reviews[i].review;
          tr.appendChild(review);

          tb.appendChild(tr);

        }
        }

      }
    });
    req.send();

  const filter = document.querySelector('#filterBtn');
  filter.addEventListener('click', function(evt){
      evt.preventDefault();

      const fsem = document.getElementById('filterSemester').value || '';
      const fyr = document.getElementById('filterYear').value || '';

      let furl = 'http://localhost:3000/api/messages?semester=' + fsem +'&year=' + fyr;
      req.open('GET',furl,true);

      req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
          const reviews = JSON.parse(req.responseText);
          let tb = document.getElementById('content').getElementsByTagName('tbody')[0];
          while(tb.hasChildNodes()){
            tb.removeChild(tb.childNodes[0]);
          }

          for(let i=0; i<reviews.length; i++){
            let tr = document.createElement('tr');
            let name = document.createElement('td');
            name.textContent = reviews[i].name;
            tr.appendChild(name);

            let semester = document.createElement('td');
            semester.textContent = reviews[i].semester;
            tr.appendChild(semester);

            let year = document.createElement('td');
            year.textContent = reviews[i].year;
            tr.appendChild(year);

            let review = document.createElement('td');
            review.textContent = reviews[i].review;
            tr.appendChild(review);

            tb.appendChild(tr);
          }
        }
      });
      req.send();
  });

  const add = document.querySelector('#addBtn');
  add.addEventListener('click', function(evt){
      evt.preventDefault();
      req.open('POST','http://localhost:3000/api/message', true);
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      let tb = document.getElementById('content').getElementsByTagName('tbody')[0];
      let addname = document.getElementById('name').value;
      let addsemester = document.getElementById('semester').value;
      let addyear = document.getElementById('year').value;
      let addreview = document.getElementById('review').value;
      let newobject = {"name":addname,"semester":addsemester,"year":addyear,"review":addreview};

      finaltable.push(newobject);

      req.send('name='+ addname+'&semester='+addsemester+'&year='+addyear
      + '&review='+addreview);
      req.addEventListener('load', function(){
      while(tb.hasChildNodes()){
        tb.removeChild(tb.childNodes[0]);
      }

      for(let i=0; i<finaltable.length; i++){
        let tr = document.createElement('tr');
        let name = document.createElement('td');
        name.textContent = finaltable[i].name;
        tr.appendChild(name);

        let semester = document.createElement('td');
        semester.textContent = finaltable[i].semester;
        tr.appendChild(semester);

        let year = document.createElement('td');
        year.textContent = finaltable[i].year;
        tr.appendChild(year);

        let review = document.createElement('td');
        review.textContent = finaltable[i].review;
        tr.appendChild(review);

        tb.appendChild(tr);
      }

      document.getElementById('filterSemester').value = '';
      document.getElementById('filterYear').value = '';
    });
  });
}

document.addEventListener("DOMContentLoaded", main);
