export * from './users.type';

export type TokensResponse = {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
};
export type AmoEntityType = 'leads' | 'contacts' | 'companies' | 'customers' | 'tasks';

export type AmoAccount = {
    id: number;
    name: string;
    subdomain: string;
    created_at: number;
    created_by: number;
    updated_at: number;
    updated_by: number;
    current_user_id: number;
    country: string;
    customers_mode: string;
    is_unsorted_on: boolean;
    is_loss_reason_enabled: boolean;
    is_helpbot_enabled: boolean;
    is_technical_account: boolean;
    contact_name_display_order: number;
    amojo_id: string;
    uuid: string;
    version: number;
};

type CustomFieldValues = {
    value: string | number;
    enum_id: number;
    enum: string;
    enum_code?: string;
};

export type CustomField = {
    field_id: number;
    field_name: string;
    field_code: string | null;
    field_type: string;
    values: CustomFieldValues[];
};

export type CreatedLeadEmbedded = {
    id: number;
    request_id: string;
    _links: Links;
};

export type CreatedLead = {
    _links: {
        self: {
            href: string;
        };
    };
    _embedded: {
        leads?: CreatedLeadEmbedded[];
    };
};

type Tag = {
    id: number;
    name: string;
    color: string | null;
};

type EmbeddedLead = {
    id: number;
    _links?: {
        self: {
            href: string;
        };
    };
};

type EmbeddedContact = {
    id?: number;
    is_main?: boolean | null;
    _links?: {
        self: {
            href: string;
        };
    };
};

type EmbeddedCompany = {
    id: number;
    _links?: {
        self: {
            href: string;
        };
    };
};

type AmoLeadEmbedded = {
    tags?: Tag[] | null;
    leads?: EmbeddedLead[];
    contacts?: EmbeddedContact[];
    companies?: EmbeddedCompany[];
};

export type AmoLead = {
    id: number;
    name: string;
    price: number;
    responsible_user_id: number;
    group_id: number;
    status_id: number;
    pipeline_id: number;
    loss_reason_id: number | null;
    created_by: number;
    updated_by: number;
    created_at: number;
    updated_at: number;
    closed_at: number | null;
    closest_task_at: null;
    is_deleted: boolean;
    custom_fields_values: CustomField[] | null;
    score: number | null;
    source_id: number | null;
    account_id: number;
    labor_cost: number | null;
    is_price_computed: boolean;
    is_price_modified_by_robot: boolean;
    _links: Links;
    _embedded: AmoLeadEmbedded;
};


export type AmoRepeatEntity = Pick<AmoLead, 'id' | 'responsible_user_id' | 'created_at'>;

export type AmoContact = {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    responsible_user_id: number;
    group_id: number;
    created_by: number;
    updated_by: number;
    created_at: number;
    updated_at: number;
    is_deleted: boolean;
    is_unsorted: boolean;
    closest_task_at: number | null;
    custom_fields_values: CustomField[] | null;
    account_id: number;
    _links: Links;
    _embedded: {
        tags: Tag[];
        companies: EmbeddedCompany[];
        contacts: EmbeddedContact[];
    };
};

export type AmoCompany = {
    id: number;
    name: string;
    responsible_user_id: number;
    group_id: number;
    created_by: number;
    updated_by: number;
    created_at: number;
    updated_at: number;
    closest_task_at: null;
    is_deleted: boolean;
    custom_fields_values: null;
    account_id: number;
    _links: Links;
    _embedded: CompanyEmbedded;
}

export type User = {
    id: number
    name: string
    email: string
    lang: string
    _links: Links
}

export type CompanyEmbedded = {
    tags: any[];
}

export type Links = {
    self: {
        href: string;
    };
}

export type Pipeline = {
    id: number;
    name: string;
    sort: number;
    is_main: boolean;
    is_unsorted_on: boolean;
    is_archive: boolean;
    account_id: number;
    _links: Links;
    _embedded: PipelineEmbedded;
}

export type PipelineEmbedded = {
    statuses: PipelineStatus[];
}

export type PipelineStatus = {
    id: number;
    name: string;
    sort: number;
    is_editable: boolean;
    pipeline_id: number;
    color: string;
    type: number;
    account_id: number;
    _links: Links;
}
