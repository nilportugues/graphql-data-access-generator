export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** ISO8601 Date values */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Query = {
  __typename?: 'Query';
  User?: Maybe<Array<Maybe<User>>>;
  User_by_id?: Maybe<User>;
  User_aggregated?: Maybe<Array<Maybe<User_Aggregated>>>;
  Note?: Maybe<Array<Maybe<Note>>>;
  Note_by_id?: Maybe<Note>;
  Note_aggregated?: Maybe<Array<Maybe<Note_Aggregated>>>;
};


export type QueryUserArgs = {
  filter?: InputMaybe<User_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryUser_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryUser_AggregatedArgs = {
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  filter?: InputMaybe<User_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryNoteArgs = {
  filter?: InputMaybe<Note_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryNote_By_IdArgs = {
  id: Scalars['ID'];
};


export type QueryNote_AggregatedArgs = {
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  filter?: InputMaybe<Note_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
  createdAt: Scalars['Date'];
  createdAt_func?: Maybe<Datetime_Functions>;
  updatedAt?: Maybe<Scalars['Date']>;
  updatedAt_func?: Maybe<Datetime_Functions>;
};

export type Datetime_Functions = {
  __typename?: 'datetime_functions';
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  week?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  weekday?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
};

export type User_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  email?: InputMaybe<String_Filter_Operators>;
  createdAt?: InputMaybe<Date_Filter_Operators>;
  createdAt_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  updatedAt?: InputMaybe<Date_Filter_Operators>;
  updatedAt_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
};

export type String_Filter_Operators = {
  _eq?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _contains?: InputMaybe<Scalars['String']>;
  _ncontains?: InputMaybe<Scalars['String']>;
  _starts_with?: InputMaybe<Scalars['String']>;
  _nstarts_with?: InputMaybe<Scalars['String']>;
  _ends_with?: InputMaybe<Scalars['String']>;
  _nends_with?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _null?: InputMaybe<Scalars['Boolean']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _empty?: InputMaybe<Scalars['Boolean']>;
  _nempty?: InputMaybe<Scalars['Boolean']>;
};

export type Date_Filter_Operators = {
  _eq?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _null?: InputMaybe<Scalars['Boolean']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
};

export type Datetime_Function_Filter_Operators = {
  year?: InputMaybe<Number_Filter_Operators>;
  month?: InputMaybe<Number_Filter_Operators>;
  week?: InputMaybe<Number_Filter_Operators>;
  day?: InputMaybe<Number_Filter_Operators>;
  weekday?: InputMaybe<Number_Filter_Operators>;
  hour?: InputMaybe<Number_Filter_Operators>;
  minute?: InputMaybe<Number_Filter_Operators>;
  second?: InputMaybe<Number_Filter_Operators>;
};

export type Number_Filter_Operators = {
  _eq?: InputMaybe<Scalars['Float']>;
  _neq?: InputMaybe<Scalars['Float']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  _gt?: InputMaybe<Scalars['Float']>;
  _gte?: InputMaybe<Scalars['Float']>;
  _lt?: InputMaybe<Scalars['Float']>;
  _lte?: InputMaybe<Scalars['Float']>;
  _null?: InputMaybe<Scalars['Boolean']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
};

export type User_Aggregated = {
  __typename?: 'User_aggregated';
  group?: Maybe<Scalars['JSON']>;
  countAll?: Maybe<Scalars['Int']>;
  count?: Maybe<User_Aggregated_Count>;
};

export type User_Aggregated_Count = {
  __typename?: 'User_aggregated_count';
  id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type Note = {
  __typename?: 'Note';
  id?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  body: Scalars['String'];
  createdAt: Scalars['Date'];
  createdAt_func?: Maybe<Datetime_Functions>;
  updatedAt?: Maybe<Scalars['Date']>;
  updatedAt_func?: Maybe<Datetime_Functions>;
  userId?: Maybe<User>;
  hero_image?: Maybe<Directus_Files>;
};


export type NoteUserIdArgs = {
  filter?: InputMaybe<User_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type NoteHero_ImageArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Directus_Files = {
  __typename?: 'directus_files';
  id?: Maybe<Scalars['ID']>;
  storage: Scalars['String'];
  filename_disk?: Maybe<Scalars['String']>;
  filename_download: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  folder?: Maybe<Directus_Folders>;
  uploaded_by?: Maybe<Directus_Users>;
  uploaded_on: Scalars['Date'];
  uploaded_on_func?: Maybe<Datetime_Functions>;
  modified_by?: Maybe<Directus_Users>;
  modified_on: Scalars['Date'];
  modified_on_func?: Maybe<Datetime_Functions>;
  charset?: Maybe<Scalars['String']>;
  filesize?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  embed?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['JSON']>;
  tags_func?: Maybe<Count_Functions>;
  metadata?: Maybe<Scalars['JSON']>;
  metadata_func?: Maybe<Count_Functions>;
};


export type Directus_FilesFolderArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type Directus_FilesUploaded_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type Directus_FilesModified_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Directus_Folders = {
  __typename?: 'directus_folders';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  parent?: Maybe<Directus_Folders>;
};


export type Directus_FoldersParentArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Directus_Folders_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Folders_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
};

export type Directus_Users = {
  __typename?: 'directus_users';
  id?: Maybe<Scalars['ID']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['JSON']>;
  tags_func?: Maybe<Count_Functions>;
  avatar?: Maybe<Directus_Files>;
  language?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['String']>;
  tfa_secret?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  role?: Maybe<Directus_Roles>;
  token?: Maybe<Scalars['String']>;
  last_access?: Maybe<Scalars['Date']>;
  last_access_func?: Maybe<Datetime_Functions>;
  last_page?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  external_identifier?: Maybe<Scalars['String']>;
  auth_data?: Maybe<Scalars['JSON']>;
  auth_data_func?: Maybe<Count_Functions>;
  email_notifications?: Maybe<Scalars['Boolean']>;
};


export type Directus_UsersAvatarArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type Directus_UsersRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Count_Functions = {
  __typename?: 'count_functions';
  count?: Maybe<Scalars['Int']>;
};

export type Directus_Files_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  storage?: InputMaybe<String_Filter_Operators>;
  filename_disk?: InputMaybe<String_Filter_Operators>;
  filename_download?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  folder?: InputMaybe<Directus_Folders_Filter>;
  uploaded_by?: InputMaybe<Directus_Users_Filter>;
  uploaded_on?: InputMaybe<Date_Filter_Operators>;
  uploaded_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  modified_by?: InputMaybe<Directus_Users_Filter>;
  modified_on?: InputMaybe<Date_Filter_Operators>;
  modified_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  charset?: InputMaybe<String_Filter_Operators>;
  filesize?: InputMaybe<String_Filter_Operators>;
  width?: InputMaybe<Number_Filter_Operators>;
  height?: InputMaybe<Number_Filter_Operators>;
  duration?: InputMaybe<Number_Filter_Operators>;
  embed?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  metadata?: InputMaybe<String_Filter_Operators>;
  metadata_func?: InputMaybe<Count_Function_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
};

export type Directus_Users_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  first_name?: InputMaybe<String_Filter_Operators>;
  last_name?: InputMaybe<String_Filter_Operators>;
  email?: InputMaybe<String_Filter_Operators>;
  password?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  avatar?: InputMaybe<Directus_Files_Filter>;
  language?: InputMaybe<String_Filter_Operators>;
  theme?: InputMaybe<String_Filter_Operators>;
  tfa_secret?: InputMaybe<String_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  token?: InputMaybe<String_Filter_Operators>;
  last_access?: InputMaybe<Date_Filter_Operators>;
  last_access_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  last_page?: InputMaybe<String_Filter_Operators>;
  provider?: InputMaybe<String_Filter_Operators>;
  external_identifier?: InputMaybe<String_Filter_Operators>;
  auth_data?: InputMaybe<String_Filter_Operators>;
  auth_data_func?: InputMaybe<Count_Function_Filter_Operators>;
  email_notifications?: InputMaybe<Boolean_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
};

export type Count_Function_Filter_Operators = {
  count?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Roles_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  ip_access?: InputMaybe<String_Filter_Operators>;
  enforce_tfa?: InputMaybe<Boolean_Filter_Operators>;
  admin_access?: InputMaybe<Boolean_Filter_Operators>;
  app_access?: InputMaybe<Boolean_Filter_Operators>;
  users?: InputMaybe<Directus_Users_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
  _and?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
};

export type Boolean_Filter_Operators = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
};

export type Directus_Roles = {
  __typename?: 'directus_roles';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  icon: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  ip_access?: Maybe<Array<Maybe<Scalars['String']>>>;
  enforce_tfa: Scalars['Boolean'];
  admin_access: Scalars['Boolean'];
  app_access: Scalars['Boolean'];
  users?: Maybe<Array<Maybe<Directus_Users>>>;
  users_func?: Maybe<Count_Functions>;
};


export type Directus_RolesUsersArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Note_Filter = {
  id?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  body?: InputMaybe<String_Filter_Operators>;
  createdAt?: InputMaybe<Date_Filter_Operators>;
  createdAt_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  updatedAt?: InputMaybe<Date_Filter_Operators>;
  updatedAt_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  userId?: InputMaybe<User_Filter>;
  hero_image?: InputMaybe<Directus_Files_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Note_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Note_Filter>>>;
};

export type Note_Aggregated = {
  __typename?: 'Note_aggregated';
  group?: Maybe<Scalars['JSON']>;
  countAll?: Maybe<Scalars['Int']>;
  count?: Maybe<Note_Aggregated_Count>;
};

export type Note_Aggregated_Count = {
  __typename?: 'Note_aggregated_count';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
  body?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  hero_image?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  create_User_items?: Maybe<Array<Maybe<User>>>;
  create_User_item?: Maybe<User>;
  create_Note_items?: Maybe<Array<Maybe<Note>>>;
  create_Note_item?: Maybe<Note>;
  update_User_items?: Maybe<Array<Maybe<User>>>;
  update_User_item?: Maybe<User>;
  update_Note_items?: Maybe<Array<Maybe<Note>>>;
  update_Note_item?: Maybe<Note>;
  delete_User_items?: Maybe<Delete_Many>;
  delete_User_item?: Maybe<Delete_One>;
  delete_Note_items?: Maybe<Delete_Many>;
  delete_Note_item?: Maybe<Delete_One>;
};


export type MutationCreate_User_ItemsArgs = {
  filter?: InputMaybe<User_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Array<Create_User_Input>>;
};


export type MutationCreate_User_ItemArgs = {
  data: Create_User_Input;
};


export type MutationCreate_Note_ItemsArgs = {
  filter?: InputMaybe<Note_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Array<Create_Note_Input>>;
};


export type MutationCreate_Note_ItemArgs = {
  data: Create_Note_Input;
};


export type MutationUpdate_User_ItemsArgs = {
  filter?: InputMaybe<User_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  data: Update_User_Input;
};


export type MutationUpdate_User_ItemArgs = {
  id: Scalars['ID'];
  data: Update_User_Input;
};


export type MutationUpdate_Note_ItemsArgs = {
  filter?: InputMaybe<Note_Filter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  data: Update_Note_Input;
};


export type MutationUpdate_Note_ItemArgs = {
  id: Scalars['ID'];
  data: Update_Note_Input;
};


export type MutationDelete_User_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_User_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Note_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDelete_Note_ItemArgs = {
  id: Scalars['ID'];
};

export type Create_User_Input = {
  id?: InputMaybe<Scalars['ID']>;
  email: Scalars['String'];
  createdAt: Scalars['Date'];
  createdAt_func?: InputMaybe<Datetime_FunctionsInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  updatedAt_func?: InputMaybe<Datetime_FunctionsInput>;
};

export type Datetime_FunctionsInput = {
  year?: InputMaybe<Scalars['Int']>;
  month?: InputMaybe<Scalars['Int']>;
  week?: InputMaybe<Scalars['Int']>;
  day?: InputMaybe<Scalars['Int']>;
  weekday?: InputMaybe<Scalars['Int']>;
  hour?: InputMaybe<Scalars['Int']>;
  minute?: InputMaybe<Scalars['Int']>;
  second?: InputMaybe<Scalars['Int']>;
};

export type Create_Note_Input = {
  id?: InputMaybe<Scalars['ID']>;
  title: Scalars['String'];
  body: Scalars['String'];
  createdAt: Scalars['Date'];
  createdAt_func?: InputMaybe<Datetime_FunctionsInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  updatedAt_func?: InputMaybe<Datetime_FunctionsInput>;
  userId?: InputMaybe<Create_User_Input>;
  hero_image?: InputMaybe<Create_Directus_Files_Input>;
};

export type Create_Directus_Files_Input = {
  id?: InputMaybe<Scalars['ID']>;
  storage: Scalars['String'];
  filename_disk?: InputMaybe<Scalars['String']>;
  filename_download: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Create_Directus_Folders_Input>;
  uploaded_by?: InputMaybe<Create_Directus_Users_Input>;
  uploaded_on: Scalars['Date'];
  uploaded_on_func?: InputMaybe<Datetime_FunctionsInput>;
  modified_by?: InputMaybe<Create_Directus_Users_Input>;
  modified_on: Scalars['Date'];
  modified_on_func?: InputMaybe<Datetime_FunctionsInput>;
  charset?: InputMaybe<Scalars['String']>;
  filesize?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  duration?: InputMaybe<Scalars['Int']>;
  embed?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  tags_func?: InputMaybe<Count_FunctionsInput>;
  metadata?: InputMaybe<Scalars['JSON']>;
  metadata_func?: InputMaybe<Count_FunctionsInput>;
};

export type Create_Directus_Folders_Input = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  parent?: InputMaybe<Create_Directus_Folders_Input>;
};

export type Create_Directus_Users_Input = {
  id?: InputMaybe<Scalars['ID']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  tags_func?: InputMaybe<Count_FunctionsInput>;
  avatar?: InputMaybe<Create_Directus_Files_Input>;
  language?: InputMaybe<Scalars['String']>;
  theme?: InputMaybe<Scalars['String']>;
  tfa_secret?: InputMaybe<Scalars['String']>;
  status: Scalars['String'];
  role?: InputMaybe<Create_Directus_Roles_Input>;
  token?: InputMaybe<Scalars['String']>;
  last_access?: InputMaybe<Scalars['Date']>;
  last_access_func?: InputMaybe<Datetime_FunctionsInput>;
  last_page?: InputMaybe<Scalars['String']>;
  provider: Scalars['String'];
  external_identifier?: InputMaybe<Scalars['String']>;
  auth_data?: InputMaybe<Scalars['JSON']>;
  auth_data_func?: InputMaybe<Count_FunctionsInput>;
  email_notifications?: InputMaybe<Scalars['Boolean']>;
};

export type Count_FunctionsInput = {
  count?: InputMaybe<Scalars['Int']>;
};

export type Create_Directus_Roles_Input = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  icon: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  enforce_tfa: Scalars['Boolean'];
  admin_access: Scalars['Boolean'];
  app_access: Scalars['Boolean'];
  users?: InputMaybe<Array<InputMaybe<Create_Directus_Users_Input>>>;
  users_func?: InputMaybe<Count_FunctionsInput>;
};

export type Update_User_Input = {
  id?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  createdAt_func?: InputMaybe<Datetime_FunctionsInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  updatedAt_func?: InputMaybe<Datetime_FunctionsInput>;
};

export type Update_Note_Input = {
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  body?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  createdAt_func?: InputMaybe<Datetime_FunctionsInput>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  updatedAt_func?: InputMaybe<Datetime_FunctionsInput>;
  userId?: InputMaybe<Update_User_Input>;
  hero_image?: InputMaybe<Update_Directus_Files_Input>;
};

export type Update_Directus_Files_Input = {
  id?: InputMaybe<Scalars['ID']>;
  storage?: InputMaybe<Scalars['String']>;
  filename_disk?: InputMaybe<Scalars['String']>;
  filename_download?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Update_Directus_Folders_Input>;
  uploaded_by?: InputMaybe<Update_Directus_Users_Input>;
  uploaded_on?: InputMaybe<Scalars['Date']>;
  uploaded_on_func?: InputMaybe<Datetime_FunctionsInput>;
  modified_by?: InputMaybe<Update_Directus_Users_Input>;
  modified_on?: InputMaybe<Scalars['Date']>;
  modified_on_func?: InputMaybe<Datetime_FunctionsInput>;
  charset?: InputMaybe<Scalars['String']>;
  filesize?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  duration?: InputMaybe<Scalars['Int']>;
  embed?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  tags_func?: InputMaybe<Count_FunctionsInput>;
  metadata?: InputMaybe<Scalars['JSON']>;
  metadata_func?: InputMaybe<Count_FunctionsInput>;
};

export type Update_Directus_Folders_Input = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Update_Directus_Folders_Input>;
};

export type Update_Directus_Users_Input = {
  id?: InputMaybe<Scalars['ID']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  tags_func?: InputMaybe<Count_FunctionsInput>;
  avatar?: InputMaybe<Update_Directus_Files_Input>;
  language?: InputMaybe<Scalars['String']>;
  theme?: InputMaybe<Scalars['String']>;
  tfa_secret?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Update_Directus_Roles_Input>;
  token?: InputMaybe<Scalars['String']>;
  last_access?: InputMaybe<Scalars['Date']>;
  last_access_func?: InputMaybe<Datetime_FunctionsInput>;
  last_page?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  external_identifier?: InputMaybe<Scalars['String']>;
  auth_data?: InputMaybe<Scalars['JSON']>;
  auth_data_func?: InputMaybe<Count_FunctionsInput>;
  email_notifications?: InputMaybe<Scalars['Boolean']>;
};

export type Update_Directus_Roles_Input = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  enforce_tfa?: InputMaybe<Scalars['Boolean']>;
  admin_access?: InputMaybe<Scalars['Boolean']>;
  app_access?: InputMaybe<Scalars['Boolean']>;
  users?: InputMaybe<Array<InputMaybe<Update_Directus_Users_Input>>>;
  users_func?: InputMaybe<Count_FunctionsInput>;
};

export type Delete_Many = {
  __typename?: 'delete_many';
  ids: Array<Maybe<Scalars['ID']>>;
};

export type Delete_One = {
  __typename?: 'delete_one';
  id: Scalars['ID'];
};
