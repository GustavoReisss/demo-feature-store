export interface Table {
    id: number;
    table_name: string;
    table_business_description: string;
    table_layer: string;
    table_origin_tables?: (string)[] | null;
    table_creation_date: string;
    table_data_domains?: (string)[] | null;
    table_created_by: string;
    table_feature_list?: TableFeatureList[] | null;
    table_sample: TableSample;
}

export interface TableFeatureList {
    feature_name: string;
    feature_version_schema: string;
    table_name: string;
    added?: boolean
}

export interface TableSample {
    [featureId: string]: (string)[]
}
