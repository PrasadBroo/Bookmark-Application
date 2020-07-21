const bookmark_title = document.getElementById('bookmark-title');
const bookmark_link = document.getElementById('bookmark-link');
const form = document.querySelector('form');
const bookmark_items = document.querySelector('.bookmark-items');



form.addEventListener('submit',addBookmark);



window.onload = ()=>{
    if(localStorage.getItem('items')==null){
        return;
    }
        let user_list = JSON.parse(localStorage.getItem('items'));
        let html_to_go = user_list.map(ele=>{
            let main = '<div class="my-2 d-flex">'+
            '<input class="form-control" type="text"  readonly value='+ele.name+'>'+
            '<a href='+ele.link+' target="_blank" rel="noopener noreferrer" class="btn btn-info mx-2">View</a>'+
            '<button class="btn btn-danger" onclick="deleteBookmark(\''+ele.link+'\')"><i class="far fa-trash-alt"></i></button>'+
            '</div>';
        return main;

        });
        bookmark_items.innerHTML = html_to_go.join('');
        
}

function addBookmark(e){
    e.preventDefault();
    let user_bookmark_list = []

    
    let bookmark_t = bookmark_title.value;
    let bookmark_l = bookmark_link.value;

    let data = {
        name:bookmark_t,
        link:bookmark_l
    }

    user_bookmark_list.push(data);

    if(localStorage.getItem('items')==null){
        localStorage.setItem('items',JSON.stringify(user_bookmark_list));
        let html_to_go_one = '<div class="my-2 d-flex">'+
        '<input class="form-control" type="text"  readonly value='+data.name+'>'+
        '<a href='+data.link+' target="_blank" rel="noopener noreferrer" class="btn btn-info mx-2">View</a>'+
        '<button class="btn btn-danger" onclick="deleteBookmark(\''+data.link+'\')"><i class="far fa-trash-alt"></i></button>'+
        '</div>';
    bookmark_items.innerHTML = html_to_go_one;
    }
    else{
        let user_list = JSON.parse(localStorage.getItem('items'));
        user_list.push(data);
        localStorage.setItem('items',JSON.stringify(user_list));
        let html_to_go_two = user_list.map(ele=>{
            let main = '<div class="my-2 d-flex">'+
            '<input class="form-control" type="text"  readonly value='+ele.name+'>'+
            '<a href='+ele.link+' target="_blank" rel="noopener noreferrer" class="btn btn-info mx-2">View</a>'+
            '<button class="btn btn-danger" onclick="deleteBookmark(\''+ele.link+'\')"><i class="far fa-trash-alt"></i></button>'+
            '</div>';
        return main;

        });
        bookmark_items.innerHTML = html_to_go_two.join('');
        
    }
    
    
}

function deleteBookmark(link){
    let user_list = JSON.parse(localStorage.getItem('items'));
    user_list.forEach((ele,i) =>{
        if(ele.link == link){
            user_list.splice(i,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(user_list));
    window.location = '/';
    
}