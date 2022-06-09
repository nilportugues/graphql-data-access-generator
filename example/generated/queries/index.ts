
import { User, User_aggregated, Note, Note_aggregated } from '../fragments' 

export const USER = `query User($filter: User_filter, $sort: [String], $limit: Int, $offset: Int, $page: Int, $search: String){
    User(filter: $filter, sort: $sort, limit: $limit, offset: $offset, page: $page, search: $search){
...User
     }
}
${User}

`

export const USER_BY_ID = `query User_by_id($id: ID!){
    User_by_id(id: $id){
...User
     }
}
${User}

`

export const USER_AGGREGATED = `query User_aggregated($groupBy: [String], $filter: User_filter, $limit: Int, $search: String, $sort: [String]){
    User_aggregated(groupBy: $groupBy, filter: $filter, limit: $limit, search: $search, sort: $sort){
...User_aggregated
     }
}
${User_aggregated}

`

export const NOTE = `query Note($filter: Note_filter, $sort: [String], $limit: Int, $offset: Int, $page: Int, $search: String){
    Note(filter: $filter, sort: $sort, limit: $limit, offset: $offset, page: $page, search: $search){
...Note
     }
}
${Note}

`

export const NOTE_BY_ID = `query Note_by_id($id: ID!){
    Note_by_id(id: $id){
...Note
     }
}
${Note}

`

export const NOTE_AGGREGATED = `query Note_aggregated($groupBy: [String], $filter: Note_filter, $limit: Int, $search: String, $sort: [String]){
    Note_aggregated(groupBy: $groupBy, filter: $filter, limit: $limit, search: $search, sort: $sort){
...Note_aggregated
     }
}
${Note_aggregated}

`

  
      