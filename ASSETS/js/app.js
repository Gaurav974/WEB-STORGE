let cl =console.log;
const stdcontainer =document.getElementById('stdcontainer')
const formcontainer =document.getElementById('formcontainer'),
fnamecontrol =document.getElementById('fname'),
lnamecontrol =document.getElementById('lname'),
emaicontrol =document.getElementById('email'),
contactcontrol =document.getElementById('contact'),
updatetbtn =document.getElementById('updatetbtn'),
submitbtn =document.getElementById('submitbtn')


let stdarry =[]

const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};
const onEdit = (ele) => {
    cl(ele.closest('tr').getAttribute('id'))
     let Edited =ele.closest('tr').getAttribute('id');
     cl(Edited)
     localStorage.setItem("Editele" ,Edited)
     let editobj =stdarry.find(std1 => std1.id === Edited);
     cl(editobj)
     fnamecontrol.value = editobj.fname
     lnamecontrol.value =editobj.lname 
     emaicontrol.value =editobj.email
     contactcontrol.value =editobj.contact 
     updatetbtn.classList.remove('d-none');
     submitbtn.classList.add('d-none')
}
const onDelete =(ele)=>{
    cl('deleted...')
    let deleted =ele.closest('tr').id;
    let deleteindex =stdarry.findIndex(std => std.id === deleted);
    stdarry.splice(deleteindex ,1);
    localStorage.setItem("setdata" , JSON.stringify(stdarry))
    templating(stdarry)
}

const templating =(arr)=>{
   let result =" ";
   arr.forEach((std,i)=>{
        result +=

        `
            <tr id="${std.id}">
                <td>${ i + 1} </td>
                <td>${std.fname}</td>
                <td>${std.lname}</td>
                <td>${std.email}</td>
                <td>${std.contact}</td>
                <td>
                <button class="btn btn-info" onclick="onEdit(this)">
                    <i class="fa-solid fa-user-pen" style="color: #000000;"></i>
                </button>
                </td>
                <td>
                <button class="btn btn-danger" onclick="onDelete(this)">
                    <i class="fa-sharp fa-solid fa-trash"></i>
                </button>
                </td>
            </tr>
        `  
   })
   stdcontainer.innerHTML = result;
  
};
stdarry =JSON.parse(localStorage.getItem("setdata")) || []
templating(stdarry);

const onsubmitbtnhandler = (eve)=>{
    eve.preventDefault();
    cl(`event is triggred`)
    let stdobj ={
        fname :fnamecontrol.value,
        lname :lnamecontrol.value,
        email :emaicontrol.value,
        contact :contactcontrol.value,
        id : generateUuid()
    };
    
    stdarry.push(stdobj);
    localStorage.setItem("setdata" , JSON.stringify(stdarry))
    eve.target.reset();
    templating(stdarry)
    
};
const onclickhandler =(eve)=>{
   let updateid = localStorage.getItem("Editele")
//   cl(updateid)
    // cl(`update`)
    stdarry.forEach(obj=>{
        if(obj.id === updateid){
            obj.fname =fnamecontrol.value,
            obj.lname =lnamecontrol.value,
            obj.email=emaicontrol.value,
            obj.contact=contactcontrol.value
            // id : generateUuid()
        }
    })
    localStorage.setItem("updateobj" ,stdarry);
    templating(stdarry)
    formcontainer.reset()
}

formcontainer.addEventListener('submit' ,onsubmitbtnhandler)
updatetbtn.addEventListener('click' ,onclickhandler)


