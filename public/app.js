$(document).ready(function(){
    let inp = $('#input');
    let btn = $('#btn');
    let list = $('#list');
    refresh();
    btn.click(function(){
        let value = inp.val();
        network(value);
    })
    inp.click(function(){
        $(inp).css('color','black');
    })
    function network(value){
        $.ajax({
            url: `/todo?task=${value}`,
            method: 'get',
            success: function(data){
                if(data === 'OK') {
                    createNode(value);
                }
            }
        })
    }
    function createNode(value) {
        let del=document.createElement('button');
        let t=document.createTextNode('delete');
        let upd=document.createElement('button');
        let u=document.createTextNode('update');
        let inp=document.createElement('input');
        let txt=document.createElement('span');
        $(inp).attr('type','hidden');
        $(inp).attr('value',value);
        upd.append(u);
        del.append(t);
        $(del).bind('click',function(){
            let T=this.previousSibling.previousSibling.innerHTML;
            console.log(T);
            let self=this;
            $.ajax({
            url: `/del`,
            method : 'post',
            data: { 'name':T},
            success: function(data){
                if(data==='OK')
                    $(self).parent().remove();
                }
            })
        })
        $(txt).bind('click',function(){
            $(txt).css('display','none');
            $(inp).attr('type','text');
            $(inp).css('color','black');
        })
        $(upd).bind('click',function(){
            let name=this.previousSibling.previousSibling.previousSibling;
            let val=this.previousSibling.previousSibling;
            let self=this;
            $.ajax({
                url:`/update`,
                method:'post',
                data:{'name':name.innerHTML,'value':val.value},
                success: function(data){
                    if(data==='OK'){
                        name.innerHTML=val.value;
                        $(name).css('display','inline');
                        $(val).attr('type','hidden');
                    }
                }
            })
        })
        let li = document.createElement('li');
        let node = document.createTextNode(value);
        txt.append(node);
        li.append(txt);
        li.append(inp);
        li.append(del);
        li.append(upd);
        list.append(li);
    }
    function refresh() {
        $.ajax({
            url: '/todoList',
            method: 'get',
            success: function(data) {
                console.log(data);
                for(let i=0; i< data.length; i++) {
                    createNode(data[i]);
                }
            }
        })
    }
})