import { Hero, lov } from './interface';


export var HEROES: Hero[] = [
  { "id": 11, "name": "A" },
  { "id": 12, "name": "B" },
  { "id": 13, "name": "C" },
  { "id": 14, "name": "D" },
  { "id": 15, "name": "F" },
  { "id": 16, "name": "RubberMan" },
  { "id": 17, "name": "Dynama" },
  { "id": 18, "name": "Dr IQ" },
  { "id": 19, "name": "Magma" },
  { "id": 20, "name": "Tornado" }
];

export var titles: lov[] = [{
  "CODE_DESC": "Mr",
  "CODE_VALUE": 'MR'
},
{
  "CODE_DESC": "Mrs",
  "CODE_VALUE": 'MRS'
},
{
  "CODE_DESC": "Ms",
  "CODE_VALUE": "MS"
},
{
  "CODE_DESC": "Prof",
  "CODE_VALUE": "PRF"
},
{
  "CODE_DESC": "Doctor",
  "CODE_VALUE": "DR"
}
];

export var gender: lov[] = [{
  "CODE_DESC": "Male",
  "CODE_VALUE": "M"
},
{
  "CODE_DESC": "Female",
  "CODE_VALUE": "F"
},
{
  "CODE_DESC": "Transgender",
  "CODE_VALUE": "T"
}
];

export var country: lov[] = [{
  "CODE_DESC": "INDIA",
  "CODE_VALUE": "IN"
},
{
  "CODE_DESC": "AFGHANISTAN",
  "CODE_VALUE": "AF"
},
{
  "CODE_DESC": "ALBANIA",
  "CODE_VALUE": "AL"
},
{
  "CODE_DESC": "ALGERIA",
  "CODE_VALUE": "DZ"
},
{
  "CODE_DESC": "AMERICAN SAMOA ASM",
  "CODE_VALUE": "AS"
},
{
  "CODE_DESC": "ANDORRA",
  "CODE_VALUE": "AD"
},
{
  "CODE_DESC": "ANGOLA",
  "CODE_VALUE": "AO"
},
{
  "CODE_DESC": "ANGUILLA",
  "CODE_VALUE": "AI"
},
{
  "CODE_DESC": "ANTARCTICA",
  "CODE_VALUE": "AQ"
},
{
  "CODE_DESC": "ANTIGUA AND BARBUDA",
  "CODE_VALUE": "AG"
}
];



export var FIELDMETADATA = {
  "fieldmetadata": {
    "country": "IN",
    "data": {
      "stages": [
        {
          "stageName": "Basic Data",
          "stageId": "BD",
          "submitUrl": null,
          "fields": [
            {
              "country": "IN",
              "logical_field_name": "full_name",
              "min_length": "2",
              "status": "A",
              "product_specific": "No",
              "sub_product_code": null,
              "joint": "Y",
              "ntb": "Y",
              "etb": "Y",
              "RTOB_STAGE": "BD",
              "rwb_rtob_stage": "BD",
              "rwb_rtob_sf_stage": null,
              "rwb_category": "bd-1",
              "rwb_ipad": "Y",
              "rwb_desktop": "Y",
              "sc_com": "Y",
              "mobile": "Y",
              "lov_field_name": "Full name",
              "child_lov_field_name": null,
              "rwb_label_name": "Rice Weight in Kg",
              "aadhaar_prepop": "Y",
              "etb_preprop": "Y",
              "value_pair": "N",
              "label_length": "9",
              "seq_no": "200",
              "positioning": "1",
              "field_set": "Yes",
              "field_set_name": "Basic Information",
              "component_type": "Number",
              "mandatory": "false",
              "length": "25",
              "type": "Text",
              "lov": "No",
              "regex": "^[a-zA-Z./'&@]+(?: [a-zA-Z./'&@]+)*$",
              "sf": null,
              "sfp": null,
              "prepopulation_service_type": null,
              "prepopulation_field_mapping": null,
              "ui_derivation_logic": null,
              "ui_defaulted_value": null,
              "default_visibility": null,
              "header": null,
              "details": null,
              "max_selects": null,
              "info_tooltips": null,
              "field_set_with_info": null
            },
            {
              "country": "IN",
              "logical_field_name": "title",
              "min_length": null,
              "status": "A",
              "product_specific": "No",
              "sub_product_code": null,
              "joint": "Y",
              "ntb": "Y",
              "etb": "Y",
              "RTOB_STAGE": "BD",
              "rwb_rtob_stage": "BD",
              "rwb_rtob_sf_stage": null,
              "rwb_category": "bd-1",
              "rwb_ipad": "Y",
              "rwb_desktop": "Y",
              "sc_com": "Y",
              "mobile": "Y",
              "lov_field_name": "Title",
              "child_lov_field_name": null,
              "rwb_label_name": "Title",
              "aadhaar_prepop": "N",
              "etb_preprop": "Y",
              "value_pair": "N",
              "label_length": "5",
              "seq_no": "300",
              "positioning": "2",
              "field_set": "Yes",
              "field_set_name": "Basic Information",
              "component_type": "Selection Box",
              "mandatory": "Yes",
              "length": "5",
              "type": "Picklist",
              "lov": "Yes",
              "regex": null,
              "sf": null,
              "sfp": null,
              "prepopulation_service_type": null,
              "prepopulation_field_mapping": null,
              "ui_derivation_logic": null,
              "ui_defaulted_value": null,
              "default_visibility": null,
              "header": null,
              "details": null,
              "max_selects": null,
              "info_tooltips": null,
              "field_set_with_info": null
            },
            {
              "country": "IN",
              "logical_field_name": "first_name",
              "min_length": null,
              "status": "A",
              "product_specific": "No",
              "sub_product_code": null,
              "joint": "Y",
              "ntb": "Y",
              "etb": "Y",
              "RTOB_STAGE": "BD",
              "rwb_rtob_stage": "BD",
              "rwb_rtob_sf_stage": null,
              "rwb_category": "bd-1",
              "rwb_ipad": "Y",
              "rwb_desktop": "Y",
              "sc_com": "Y",
              "mobile": "Y",
              "lov_field_name": "First name",
              "child_lov_field_name": null,
              "rwb_label_name": "Netkg price",
              "aadhaar_prepop": "N",
              "etb_preprop": "Y",
              "value_pair": "N",
              "label_length": "10",
              "seq_no": "400",
              "positioning": "2",
              "field_set": "Yes",
              "field_set_name": "Basic Information",
              "component_type": "Number",
              "mandatory": "true",
              "length": "35",
              "type": "Text",
              "lov": "No",
              "regex": "^[a-zA-Z./'&@]+(?: [a-zA-Z./'&@]+)*$",
              "sf": null,
              "sfp": null,
              "prepopulation_service_type": null,
              "prepopulation_field_mapping": null,
              "ui_derivation_logic": null,
              "ui_defaulted_value": null,
              "default_visibility": null,
              "header": null,
              "details": null,
              "max_selects": null,
              "info_tooltips": null,
              "field_set_with_info": null
            }
            // },
            // {
            //   "country": "IN",
            //   "logical_field_name": "other_id_type",
            //   "min_length": null,
            //   "status": "A",
            //   "product_specific": "No",
            //   "sub_product_code": null,
            //   "joint": "Y",
            //   "ntb": "Y",
            //   "etb": "Y",
            //   "RTOB_STAGE": "BD",
            //   "rwb_rtob_stage": "BD",
            //   "rwb_rtob_sf_stage": null,
            //   "rwb_category": "bd-1",
            //   "rwb_ipad": "Y",
            //   "rwb_desktop": "Y",
            //   "sc_com": "Y",
            //   "mobile": "Y",
            //   "lov_field_name": "Other ID type",
            //   "child_lov_field_name": null,
            //   "rwb_label_name": "Additional ID type",
            //   "aadhaar_prepop": "N",
            //   "etb_preprop": "Y",
            //   "value_pair": "N",
            //   "label_length": "18",
            //   "seq_no": "1800",
            //   "positioning": "2",
            //   "field_set": "Yes",
            //   "field_set_name": "ID Details",
            //   "component_type": "Selection Box",
            //   "mandatory": "false",
            //   "length": "3",
            //   "type": "Picklist",
            //   "lov": "Yes",
            //   "regex": null,
            //   "sf": null,
            //   "sfp": null,
            //   "prepopulation_service_type": null,
            //   "prepopulation_field_mapping": null,
            //   "ui_derivation_logic": null,
            //   "ui_defaulted_value": null,
            //   "default_visibility": null,
            //   "header": null,
            //   "details": null,
            //   "max_selects": null,
            //   "info_tooltips": null,
            //   "field_set_with_info": null
            // }
          ]
        }
      ]
    },
    "version": "8.5"
  }
}