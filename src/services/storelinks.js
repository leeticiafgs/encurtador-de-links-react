// Buscar links salvos

export async function getLinksSave(key){
    const myLinks = await localStorage.getItem(key);

    let linksSaves = JSON.parse(myLinks) || [];

    return linksSaves;
}

//Salvar um link no localStorage

export async function saveLink(key,newlink){

    let linksStored = await getLinksSave(key)

    // Se ja tiver algum link ksalvo com algum ID eu nao vou deixar duplicar

    const hasLink = linksStored.some(link => link.id===newlink.id);// compara se te algum lnk igual a esse que eu vou comparar

    if(hasLink){
        console.log('Esse link ja existe na sua lista');
        return;
    }

    //Adicionar esse novo link na lista
    linksStored.push(newlink)
    await localStorage.setItem(key, JSON.stringify(linksStored));
    console.log('Link salvo com sucesso');
}

//Deletar algum link salvo

export function deleteLink (links, id){
    let myLinks = links.filter(item => {
        return (item.id !== id)
    })

    localStorage.setItem('@encurtaLink', JSON.stringify(myLinks));
    console.log('Link deletado com sucesso');

    return myLinks;
}