const __delete_many = `fragment delete_many on delete_many {
  ids
}
`

const __delete_manyDeepNesting = `fragment delete_manyDeepNesting on delete_many {
  ids
}
`

const __delete_manyNoNesting = `fragment delete_manyNoNesting on delete_many {
  ids
}
`

const __delete_one = `fragment delete_one on delete_one {
  id
}
`

const __delete_oneDeepNesting = `fragment delete_oneDeepNesting on delete_one {
  id
}
`

const __delete_oneNoNesting = `fragment delete_oneNoNesting on delete_one {
  id
}
`

const __directus_files = `fragment directus_files on directus_files {
  id
  storage
  filename_disk
  filename_download
  title
  type
  folder {
    ...directus_foldersNoNesting
  }
  uploaded_by {
    ...directus_usersNoNesting
  }
  uploaded_on
  modified_by {
    ...directus_usersNoNesting
  }
  modified_on
  charset
  filesize
  width
  height
  duration
  embed
  description
  location
  tags
  metadata
}
`

const __directus_filesDeepNesting = `fragment directus_filesDeepNesting on directus_files {
  id
  storage
  filename_disk
  filename_download
  title
  type
  folder {
    ...directus_foldersDeepNesting
  }
  uploaded_by {
    ...directus_usersDeepNesting
  }
  uploaded_on
  modified_by {
    ...directus_usersDeepNesting
  }
  modified_on
  charset
  filesize
  width
  height
  duration
  embed
  description
  location
  tags
  metadata
}
`

const __directus_filesNoNesting = `fragment directus_filesNoNesting on directus_files {
  id
  storage
  filename_disk
  filename_download
  title
  type
  uploaded_on
  modified_on
  charset
  filesize
  width
  height
  duration
  embed
  description
  location
  tags
  metadata
}
`

const __directus_folders = `fragment directus_folders on directus_folders {
  id
  name
  parent {
    ...directus_foldersNoNesting
  }
}
`

const __directus_foldersDeepNesting = `fragment directus_foldersDeepNesting on directus_folders {
  id
  name
  parent {
    ...directus_foldersDeepNesting
  }
}
`

const __directus_foldersNoNesting = `fragment directus_foldersNoNesting on directus_folders {
  id
  name
}
`

const __directus_roles = `fragment directus_roles on directus_roles {
  id
  name
  icon
  description
  ip_access
  enforce_tfa
  admin_access
  app_access
  users {
    ...directus_usersNoNesting
  }
}
`

const __directus_rolesDeepNesting = `fragment directus_rolesDeepNesting on directus_roles {
  id
  name
  icon
  description
  ip_access
  enforce_tfa
  admin_access
  app_access
  users {
    ...directus_usersDeepNesting
  }
}
`

const __directus_rolesNoNesting = `fragment directus_rolesNoNesting on directus_roles {
  id
  name
  icon
  description
  ip_access
  enforce_tfa
  admin_access
  app_access
}
`

const __directus_users = `fragment directus_users on directus_users {
  id
  first_name
  last_name
  email
  password
  location
  title
  description
  tags
  avatar {
    ...directus_filesNoNesting
  }
  language
  theme
  tfa_secret
  status
  role {
    ...directus_rolesNoNesting
  }
  token
  last_access
  last_page
  provider
  external_identifier
  auth_data
  email_notifications
}
`

const __directus_usersDeepNesting = `fragment directus_usersDeepNesting on directus_users {
  id
  first_name
  last_name
  email
  password
  location
  title
  description
  tags
  avatar {
    ...directus_filesDeepNesting
  }
  language
  theme
  tfa_secret
  status
  role {
    ...directus_rolesDeepNesting
  }
  token
  last_access
  last_page
  provider
  external_identifier
  auth_data
  email_notifications
}
`

const __directus_usersNoNesting = `fragment directus_usersNoNesting on directus_users {
  id
  first_name
  last_name
  email
  password
  location
  title
  description
  tags
  language
  theme
  tfa_secret
  status
  token
  last_access
  last_page
  provider
  external_identifier
  auth_data
  email_notifications
}
`

const __Note = `fragment Note on Note {
  id
  title
  body
  createdAt
  updatedAt
  userId {
    ...UserNoNesting
  }
  hero_image {
    ...directus_filesNoNesting
  }
}
`

const __Note_aggregated = `fragment Note_aggregated on Note_aggregated {
  group
  countAll
  count {
    ...Note_aggregated_countNoNesting
  }
}
`

const __Note_aggregated_count = `fragment Note_aggregated_count on Note_aggregated_count {
  id
  title
  body
  createdAt
  updatedAt
  userId
  hero_image
}
`

const __Note_aggregated_countDeepNesting = `fragment Note_aggregated_countDeepNesting on Note_aggregated_count {
  id
  title
  body
  createdAt
  updatedAt
  userId
  hero_image
}
`

const __Note_aggregated_countNoNesting = `fragment Note_aggregated_countNoNesting on Note_aggregated_count {
  id
  title
  body
  createdAt
  updatedAt
  userId
  hero_image
}
`

const __Note_aggregatedDeepNesting = `fragment Note_aggregatedDeepNesting on Note_aggregated {
  group
  countAll
  count {
    ...Note_aggregated_countDeepNesting
  }
}
`

const __Note_aggregatedNoNesting = `fragment Note_aggregatedNoNesting on Note_aggregated {
  group
  countAll
}
`

const __NoteDeepNesting = `fragment NoteDeepNesting on Note {
  id
  title
  body
  createdAt
  updatedAt
  userId {
    ...UserDeepNesting
  }
  hero_image {
    ...directus_filesDeepNesting
  }
}
`

const __NoteNoNesting = `fragment NoteNoNesting on Note {
  id
  title
  body
  createdAt
  updatedAt
}
`

const __User = `fragment User on User {
  id
  email
  createdAt
  updatedAt
}
`

const __User_aggregated = `fragment User_aggregated on User_aggregated {
  group
  countAll
  count {
    ...User_aggregated_countNoNesting
  }
}
`

const __User_aggregated_count = `fragment User_aggregated_count on User_aggregated_count {
  id
  email
  createdAt
  updatedAt
}
`

const __User_aggregated_countDeepNesting = `fragment User_aggregated_countDeepNesting on User_aggregated_count {
  id
  email
  createdAt
  updatedAt
}
`

const __User_aggregated_countNoNesting = `fragment User_aggregated_countNoNesting on User_aggregated_count {
  id
  email
  createdAt
  updatedAt
}
`

const __User_aggregatedDeepNesting = `fragment User_aggregatedDeepNesting on User_aggregated {
  group
  countAll
  count {
    ...User_aggregated_countDeepNesting
  }
}
`

const __User_aggregatedNoNesting = `fragment User_aggregatedNoNesting on User_aggregated {
  group
  countAll
}
`

const __UserDeepNesting = `fragment UserDeepNesting on User {
  id
  email
  createdAt
  updatedAt
}
`

const __UserNoNesting = `fragment UserNoNesting on User {
  id
  email
  createdAt
  updatedAt
}
`

export const Note = `
${__Note}
${__UserNoNesting}
${__directus_filesNoNesting}
`

export const NoteDeepNesting = `
${__NoteDeepNesting}
${__directus_usersDeepNesting}
${__directus_filesDeepNesting}
${__directus_rolesDeepNesting}
${__directus_foldersDeepNesting}
${__UserDeepNesting}
`

export const NoteNoNesting = `
${__NoteNoNesting}
`

export const Note_aggregated = `
${__Note_aggregated}
${__Note_aggregated_countNoNesting}
`

export const Note_aggregatedDeepNesting = `
${__Note_aggregatedDeepNesting}
${__Note_aggregated_countDeepNesting}
`

export const Note_aggregatedNoNesting = `
${__Note_aggregatedNoNesting}
`

export const Note_aggregated_count = `
${__Note_aggregated_count}
`

export const Note_aggregated_countDeepNesting = `
${__Note_aggregated_countDeepNesting}
`

export const Note_aggregated_countNoNesting = `
${__Note_aggregated_countNoNesting}
`

export const User = `
${__User}
`

export const UserDeepNesting = `
${__UserDeepNesting}
`

export const UserNoNesting = `
${__UserNoNesting}
`

export const User_aggregated = `
${__User_aggregated}
${__User_aggregated_countNoNesting}
`

export const User_aggregatedDeepNesting = `
${__User_aggregatedDeepNesting}
${__User_aggregated_countDeepNesting}
`

export const User_aggregatedNoNesting = `
${__User_aggregatedNoNesting}
`

export const User_aggregated_count = `
${__User_aggregated_count}
`

export const User_aggregated_countDeepNesting = `
${__User_aggregated_countDeepNesting}
`

export const User_aggregated_countNoNesting = `
${__User_aggregated_countNoNesting}
`

export const delete_many = `
${__delete_many}
`

export const delete_manyDeepNesting = `
${__delete_manyDeepNesting}
`

export const delete_manyNoNesting = `
${__delete_manyNoNesting}
`

export const delete_one = `
${__delete_one}
`

export const delete_oneDeepNesting = `
${__delete_oneDeepNesting}
`

export const delete_oneNoNesting = `
${__delete_oneNoNesting}
`

export const directus_files = `
${__directus_files}
${__directus_foldersNoNesting}
${__directus_usersNoNesting}
`

export const directus_filesDeepNesting = `
${__directus_filesDeepNesting}
${__directus_usersDeepNesting}
${__directus_rolesDeepNesting}
${__directus_foldersDeepNesting}
`

export const directus_filesNoNesting = `
${__directus_filesNoNesting}
`

export const directus_folders = `
${__directus_folders}
${__directus_foldersNoNesting}
`

export const directus_foldersDeepNesting = `
${__directus_foldersDeepNesting}
`

export const directus_foldersNoNesting = `
${__directus_foldersNoNesting}
`

export const directus_roles = `
${__directus_roles}
${__directus_usersNoNesting}
`

export const directus_rolesDeepNesting = `
${__directus_rolesDeepNesting}
${__directus_foldersDeepNesting}
${__directus_usersDeepNesting}
${__directus_filesDeepNesting}
`

export const directus_rolesNoNesting = `
${__directus_rolesNoNesting}
`

export const directus_users = `
${__directus_users}
${__directus_filesNoNesting}
${__directus_rolesNoNesting}
`

export const directus_usersDeepNesting = `
${__directus_usersDeepNesting}
${__directus_foldersDeepNesting}
${__directus_filesDeepNesting}
${__directus_rolesDeepNesting}
`

export const directus_usersNoNesting = `
${__directus_usersNoNesting}
`