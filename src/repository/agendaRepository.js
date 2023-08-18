import { con } from "./connnection.js"


export async function InserirContato (contato) {

    const comando = 
        `   INSERT INTO TB_AGENDA (NM_CONTATO, DS_TELEFONE, DS_EMAIL, BT_FAVORITO, DT_CADASTRO)
                    VALUES(?, ?, ?, ?, ?)`

    const [resposta] = await con.query(comando, [contato.nome, contato.telefone, contato.email, contato.favorito, contato.data ])
    contato.id = resposta.insertId
    return contato

}


export async function ListarContatos () {

    const comando = 
            ` SELECT * FROM 
                    TB_AGENDA`

    const [resposta] = await con.query (comando)
    return resposta;
}


export async function ListarContatosNome (nome) {
    console.log(nome)
    const comando = 
            ` SELECT * 
            FROM TB_AGENDA
            WHERE NM_CONTATO like ?`

    const [resposta] = await con.query (comando, [])
    return resposta;
}
export async function ListarContatosFavoritos () {

    const comando = 
            ` SELECT * FROM 
                    TB_AGENDA
                        where bt_favorito = true`

    const [resposta] = await con.query (comando)
    return resposta;
}


export async function ListarContatosIntervalo (inicio,fim) {
    console.log(inicio,fim)
    const comando = 
            ` SELECT * 
                FROM TB_AGENDA
                    WHERE   ID_AGENDA > ? && id_agenda < ?`

    const [resposta] = await con.query (comando, [inicio,fim])
    return resposta;
}


export async function AlterarContato (id, contato) {

    const comando = 
        ` UPDATE TB_AGENDA 
                SET NM_CONTATO      = ?, 
                DS_TELEFONE         = ?, 
                DS_EMAIL            = ?, 
                BT_FAVORITO         = ?, 
                DT_CADASTRO         = ? 
            WHERE ID_AGENDA = ? `

    const [resposta] = await con.query(comando, [contato.nome, contato.telefone, contato.email, contato.favorito, contato.data, id])

    return resposta.affectedRows;
}

export async function DeletarContato (id) {
    console.log(id)
    const comando = 
            ` DELETE FROM TB_AGENDA
                WHERE ID_AGENDA = ?`

    const [resposta] = await con.query (comando, [id])
    return resposta.affectedRows;
}