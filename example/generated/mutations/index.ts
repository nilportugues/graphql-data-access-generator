
import { User, Note, delete_many, delete_one } from '../fragments' 

export const CREATE_USER_ITEMS = `mutation create_User_items($filter: User_filter, $sort: [String], $limit: Int, $offset: Int, $page: Int, $search: String, $data: [create_User_input!]){
    create_User_items(filter: $filter, sort: $sort, limit: $limit, offset: $offset, page: $page, search: $search, data: $data){
...User
     }
}
${User}

`

export const CREATE_USER_ITEM = `mutation create_User_item($data: create_User_input!){
    create_User_item(data: $data){
...User
     }
}
${User}

`

export const CREATE_NOTE_ITEMS = `mutation create_Note_items($filter: Note_filter, $sort: [String], $limit: Int, $offset: Int, $page: Int, $search: String, $data: [create_Note_input!]){
    create_Note_items(filter: $filter, sort: $sort, limit: $limit, offset: $offset, page: $page, search: $search, data: $data){
...Note
     }
}
${Note}

`

export const CREATE_NOTE_ITEM = `mutation create_Note_item($data: create_Note_input!){
    create_Note_item(data: $data){
...Note
     }
}
${Note}

`

export const UPDATE_USER_ITEMS = `mutation update_User_items($filter: User_filter, $sort: [String], $limit: Int, $offset: Int, $page: Int, $search: String, $ids: [ID]!, $data: update_User_input!){
    update_User_items(filter: $filter, sort: $sort, limit: $limit, offset: $offset, page: $page, search: $search, ids: $ids, data: $data){
...User
     }
}
${User}

`

export const UPDATE_USER_ITEM = `mutation update_User_item($id: ID!, $data: update_User_input!){
    update_User_item(id: $id, data: $data){
...User
     }
}
${User}

`

export const UPDATE_NOTE_ITEMS = `mutation update_Note_items($filter: Note_filter, $sort: [String], $limit: Int, $offset: Int, $page: Int, $search: String, $ids: [ID]!, $data: update_Note_input!){
    update_Note_items(filter: $filter, sort: $sort, limit: $limit, offset: $offset, page: $page, search: $search, ids: $ids, data: $data){
...Note
     }
}
${Note}

`

export const UPDATE_NOTE_ITEM = `mutation update_Note_item($id: ID!, $data: update_Note_input!){
    update_Note_item(id: $id, data: $data){
...Note
     }
}
${Note}

`

export const DELETE_USER_ITEMS = `mutation delete_User_items($ids: [ID]!){
    delete_User_items(ids: $ids){
...delete_many
     }
}
${delete_many}

`

export const DELETE_USER_ITEM = `mutation delete_User_item($id: ID!){
    delete_User_item(id: $id){
...delete_one
     }
}
${delete_one}

`

export const DELETE_NOTE_ITEMS = `mutation delete_Note_items($ids: [ID]!){
    delete_Note_items(ids: $ids){
...delete_many
     }
}
${delete_many}

`

export const DELETE_NOTE_ITEM = `mutation delete_Note_item($id: ID!){
    delete_Note_item(id: $id){
...delete_one
     }
}
${delete_one}

`

  
      