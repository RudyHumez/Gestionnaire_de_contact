$("section").hide();

$(document).on("click", "#liste-contacts", function (e) {
  e.preventDefault();
  liste();
});

$(document).on("click", "#nv-contact", function (e) {
  e.preventDefault();
  $("section").hide();
  $(".ajout-contact").show();
});

$(document).on("submit", ".ajout-contact form", function (e) {
  e.preventDefault();
  ajoutContact();
});

$(document).on("click", "button.modif-contact ", function (e) {
  $("section").hide();
  $("section.modif-contact").show();
  modifContact($(this).attr("id"));
});

$(document).on("submit", ".modif-contact form", function (e) {
  e.preventDefault();
  majContact($(".modif-contact .maj-contact ").attr("id"));
});

$(document).on("click", ".supp-contact", function () {
  suppContact($(this).attr("id"));
});

//------------------------------------------------------------
$(document).on("click", "#tdb", function () {
  $("section").hide();
  tableauDeBord();
});

$(document).on("click", ".ajout-contact2", function (e) {
  e.preventDefault();
  $("section").hide();
  $(".ajout-contact").show();
});

$(document).on("click", ".contact2", function (e) {
  e.preventDefault();
  liste();
});

$(document).on("click", ".listeamis", function () {
  listeAmis();
});

$(document).on("click", ".listefamille", function () {
  listeFamille();
});

$(document).on("click", ".listetravail", function () {
  listeTravail();
});

$(document).on("click", ".listeautres", function () {
  listeAutres();
});
//------------------------------------------------------------

function liste() {
  let request = $.ajax({
    type: "GET",
    url: "http://localhost:3000/contacts",
    dataType: "json",
  });

  request.done(function (response) {
    let html = "";
    if (response.length !== 0) {
      html += ` <h1>Liste des contacts </h1>
			<table class="table table-striped">
			<thead>
				<tr>
					<th scope="col">#ID</th>
					<th scope="col">Nom</th>
					<th scope="col">Prénom</th>
          <th scope="col">Adresse</th>
          <th scope="col">Email</th>
          <th scope="col">Tél</th>
          <th scope="col">Catégorie</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>`;
      response.map((contact) => {
        html += `
			<tr>
					<th scope="row">${contact.id}</th>
					<td>${contact.nom}</td>
					<td>${contact.prenom}</td>
					<td>${contact.adresse}</td>
					<td>${contact.email}</td>
					<td>${contact.tel}</td>
					<td>${contact.categorie}</td>
					<td>
						<button type="button" class="btn btn-info modif-contact" id="${contact.id}">
						<i class="fas fa-edit mr-1"></i>Modifier</button>

						<button type="button" class="btn btn-danger supp-contact" id="${contact.id}">
						<i class="fas fa-trash-alt mr-1"></i>Supprimer</button>
										
					</td>
			</tr>
			`;
      });

      html += `	</tbody>
					</table>`;
    } else {
      html = `
			<div class="alert alert-danger" role="alert">
  			Aucun contact ne figure dans la liste.
			</div>`;
    }
    $(".liste").html(html);
    $("section").hide();
    $(".liste").show();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}
function ajoutContact() {
  let request = $.ajax({
    type: "POST",
    url: "http://localhost:3000/contacts",
    data: {
      id: new Date().getTime(),
      nom: $("#nom").val(),
      prenom: $("#prenom").val(),
      adresse: $("#adresse").val(),
      email: $("#email").val(),
      tel: $("#tel").val(),
      categorie: $("#categorie").val(),
    },
    dataType: "json",
  });

  request.done(function (response) {
    liste();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}

function modifContact(id) {
  let request = $.ajax({
    type: "GET",
    url: `http://localhost:3000/contacts/${id}`,
    dataType: "json",
  });

  request.done(function (response) {
    $(".modif-contact #nom").val(response.nom);
    $(".modif-contact #prenom").val(response.prenom);
    $(".modif-contact #adresse").val(response.adresse);
    $(".modif-contact #email").val(response.email);
    $(".modif-contact #tel").val(response.tel);
    $(".modif-contact #categorie").val(response.categorie);
    $("button.maj-contact").attr("id", response.id);
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}

function majContact(id) {
  let request = $.ajax({
    type: "PUT",
    url: `http://localhost:3000/contacts/${id}`,
    data: {
      nom: $(".modif-contact #nom").val(),
      prenom: $(".modif-contact #prenom").val(),
      adresse: $(".modif-contact #adresse").val(),
      email: $(".modif-contact #email").val(),
      tel: $(".modif-contact #tel").val(),
      categorie: $(".modif-contact #categorie").val(),
    },
    dataType: "json",
  });

  request.done(function (response) {
    liste();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}

function suppContact(id) {
  let request = $.ajax({
    type: "DELETE",
    url: `http://localhost:3000/contacts/${id}`,
    dataType: "json",
  });

  request.done(function (response) {
    liste();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}

//------------------------------------------------------------------------
function tableauDeBord() {
  let request = $.ajax({
    type: "GET",
    url: "http://localhost:3000/contacts",
    dataType: "json",
  });

  request.done(function (response) {
    let nbamis = 0;
    let nbfamille = 0;
    let nbtravail = 0;
    let nbautres = 0;
    response.map((listcategorie) => {
      if (listcategorie.categorie === "Amis") {
        nbamis += 1;
      } else if (listcategorie.categorie === "Famille") {
        nbfamille += 1;
      } else if (listcategorie.categorie === "Travail") {
        nbtravail += 1;
      } else if (listcategorie.categorie === "Autres") {
        nbautres += 1;
      }
    });

    let html2 = `
  <div class="d-flex justify-content-around">

    <div class="border border-dark rounded-lg p-4 text-center bg-light w-50 p-3 shadow">
      <h2>Contacts:</h2><br />    
      <i class="fas fa-user fa-5x"></i><br /><br />
      <button type="button" class="btn btn-secondary">
        Nombres de contacts: <span class="badge badge-light">${response.length}</span>
      </button><br /><br /><br /><br />
      <button type="button" class="btn btn-success ajout-contact2"><i class="fas fa-plus-circle"></i> Ajouter</button>
      <button type="button" class="btn btn-info contact2" id=""><i class="fas fa-edit mr-1"></i> Modifier</button>
        <br /><br />
      <button type="button" class="btn btn-danger contact2"><i class="fas fa-trash-alt mr-1"></i>Supprimer</button>
    </div>
      
  <div class="border border-dark rounded-lg p-4 text-center bg-light w-50 p-3 shadow">
  <h2>Réseaux:</h2><br />
    <i class="fas fa-users fa-5x"></i>
  <br /><br />
      <button type="button" class="btn btn-secondary">
        Nombres de contacts: <span class="badge badge-light">${response.length}</span>
      </button>
  <br /><br />
      <button type="button" class="btn btn-secondary">
       Nombres de catégorie: <span class="badge badge-light">${document.getElementById("categorie").options.length - 1}</span>
      </button>
  <br /><br />
      <button type="button" class="btn btn-outline-dark listeamis">
        Amis: <span class="badge badge-dark">${nbamis}</span>
      </button>
      <button type="button" class="btn btn-outline-dark listefamille">
         Famille: <span class="badge badge-dark">${nbfamille}</span>
      </button>
  <br /><br />
      <button type="button" class="btn btn-outline-dark listetravail">
         Travail: <span class="badge badge-dark">${nbtravail}</span>
      </button>
      <button type="button" class="btn btn-outline-dark listeautres">
        Autres: <span class="badge badge-dark">${nbautres}</span>
      </button>

  </div>
</div>`;

    $(".tableaudb").html(html2);
    $(".tableaudb").show();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}

function listeAmis() {
  let request = $.ajax({
    type: "GET",
    url: "http://localhost:3000/contacts",
    dataType: "json",
  });

  request.done(function (listeamis) {
    let html3 = "";
    if (listeamis.length !== 0) {
      html3 += ` <h1>Liste des Amis </h1>
			<table class="table table-striped">
			<thead>
				<tr>
					<th scope="col">#ID</th>
					<th scope="col">Nom</th>
					<th scope="col">Prénom</th>
          <th scope="col">Adresse</th>
          <th scope="col">Email</th>
          <th scope="col">Tél</th>
          <th scope="col">Catégorie</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>`;
      listeamis.map((amis) => {
        if (amis.categorie === "Amis") {
          html3 += `
			<tr>
					<th scope="row">${amis.id}</th>
					<td>${amis.nom}</td>
					<td>${amis.prenom}</td>
					<td>${amis.adresse}</td>
					<td>${amis.email}</td>
					<td>${amis.tel}</td>
					<td>${amis.categorie}</td>
					<td>
						<button type="button" class="btn btn-info modif-contact" id="${amis.id}">
						<i class="fas fa-edit mr-1"></i>Modifier</button>
						<button type="button" class="btn btn-danger supp-contact" id="${amis.id}">
						<i class="fas fa-trash-alt mr-1"></i>Supprimer</button>										
					</td>
			</tr>`;
        }
      });
      html3 += `	</tbody>
					</table>`;
    } else {
      html3 = `
			<div class="alert alert-danger" role="alert">
  			Aucun contact ne figure dans la liste.
			</div>`;
    }
    $(".liste2").html(html3);
    $("section").hide();
    $(".liste2").show();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}

function listeFamille() {
  let request = $.ajax({
    type: "GET",
    url: "http://localhost:3000/contacts",
    dataType: "json",
  });

  request.done(function (listefamille) {
    let html4 = "";
    if (listefamille.length !== 0) {
      html4 += ` <h1>Liste des Amis </h1>
			<table class="table table-striped">
			<thead>
				<tr>
					<th scope="col">#ID</th>
					<th scope="col">Nom</th>
					<th scope="col">Prénom</th>
          <th scope="col">Adresse</th>
          <th scope="col">Email</th>
          <th scope="col">Tél</th>
          <th scope="col">Catégorie</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>`;
      listefamille.map((famille) => {
        if (famille.categorie === "Famille") {
          html4 += `
			<tr>
					<th scope="row">${famille.id}</th>
					<td>${famille.nom}</td>
					<td>${famille.prenom}</td>
					<td>${famille.adresse}</td>
					<td>${famille.email}</td>
					<td>${famille.tel}</td>
					<td>${famille.categorie}</td>
					<td>
						<button type="button" class="btn btn-info modif-contact" id="${famille.id}">
						<i class="fas fa-edit mr-1"></i>Modifier</button>
						<button type="button" class="btn btn-danger supp-contact" id="${famille.id}">
						<i class="fas fa-trash-alt mr-1"></i>Supprimer</button>										
					</td>
			</tr>`;
        }
      });
      html4 += `	</tbody>
					</table>`;
    } else {
      html4 = `
			<div class="alert alert-danger" role="alert">
  			Aucun contact ne figure dans la liste.
			</div>`;
    }
    $(".liste3").html(html4);
    $("section").hide();
    $(".liste3").show();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}

function listeTravail() {
  let request = $.ajax({
    type: "GET",
    url: "http://localhost:3000/contacts",
    dataType: "json",
  });

  request.done(function (listetravail) {
    let html5 = "";
    if (listetravail.length !== 0) {
      html5 += ` <h1>Liste des Amis </h1>
			<table class="table table-striped">
			<thead>
				<tr>
					<th scope="col">#ID</th>
					<th scope="col">Nom</th>
					<th scope="col">Prénom</th>
          <th scope="col">Adresse</th>
          <th scope="col">Email</th>
          <th scope="col">Tél</th>
          <th scope="col">Catégorie</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>`;
      listetravail.map((travail) => {
        if (travail.categorie === "Travail") {
          html5 += `
			<tr>
					<th scope="row">${travail.id}</th>
					<td>${travail.nom}</td>
					<td>${travail.prenom}</td>
					<td>${travail.adresse}</td>
					<td>${travail.email}</td>
					<td>${travail.tel}</td>
					<td>${travail.categorie}</td>
					<td>
						<button type="button" class="btn btn-info modif-contact" id="${travail.id}">
						<i class="fas fa-edit mr-1"></i>Modifier</button>
						<button type="button" class="btn btn-danger supp-contact" id="${travail.id}">
						<i class="fas fa-trash-alt mr-1"></i>Supprimer</button>										
					</td>
			</tr>`;
        }
      });
      html5 += `	</tbody>
					</table>`;
    } else {
      html5 = `
			<div class="alert alert-danger" role="alert">
  			Aucun contact ne figure dans la liste.
			</div>`;
    }
    $(".liste4").html(html5);
    $("section").hide();
    $(".liste4").show();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}

function listeAutres() {
  let request = $.ajax({
    type: "GET",
    url: "http://localhost:3000/contacts",
    dataType: "json",
  });

  request.done(function (listeautres) {
    let html6 = "";
    if (listeautres.length !== 0) {
      html6 += ` <h1>Liste des Amis </h1>
			<table class="table table-striped">
			<thead>
				<tr>
					<th scope="col">#ID</th>
					<th scope="col">Nom</th>
					<th scope="col">Prénom</th>
          <th scope="col">Adresse</th>
          <th scope="col">Email</th>
          <th scope="col">Tél</th>
          <th scope="col">Catégorie</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>`;
      listeautres.map((autres) => {
        if (autres.categorie === "Autres") {
          html6 += `
			<tr>
					<th scope="row">${autres.id}</th>
					<td>${autres.nom}</td>
					<td>${autres.prenom}</td>
					<td>${autres.adresse}</td>
					<td>${autres.email}</td>
					<td>${autres.tel}</td>
					<td>${autres.categorie}</td>
					<td>
						<button type="button" class="btn btn-info modif-contact" id="${autres.id}">
						<i class="fas fa-edit mr-1"></i>Modifier</button>
						<button type="button" class="btn btn-danger supp-contact" id="${autres.id}">
						<i class="fas fa-trash-alt mr-1"></i>Supprimer</button>										
					</td>
			</tr>`;
        }
      });
      html6 += `	</tbody>
					</table>`;
    } else {
      html6 = `
			<div class="alert alert-danger" role="alert">
  			Aucun contact ne figure dans la liste.
			</div>`;
    }
    $(".liste5").html(html6);
    $("section").hide();
    $(".liste5").show();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}
//------------------------------------------------------------------------
