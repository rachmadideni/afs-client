import { map } from 'lodash/collection';
import _ from 'lodash';

export function mapping_form_akad(data){
    const adaptedForm = map(data, (item, key) => {
        switch(key){
            case 'stskwn':
                return {
                    'name':'STSKWN',
                    'value': item
                }
            case 'nmpsgn':
                return {
                    'name':'NMPSGN',
                    'value': item.toUpperCase()
                }
            case 'tglhrp':
                return {
                    'name': 'TGLHRP',
                    'value': item
                }
            case 'noktpp':
                return {
                    'name':'NOKTPP',
                    'value': item
                }
            case 'jmlank':
                return {
                    'name': 'JMLANK',
                    'value': item
                }            
            case 'idkota':
                return {
                    'name':'IDKOTA',
                    'value': item
                }
            case 'idkecm':
                return {
                    'name':'IDKECM',
                    'value': item
                }
            case 'idkelr':
                return {
                    'name':'IDKELR',
                    'value': item
                }
        }
    });
    const filtered = _.filter(adaptedForm, undefined); // remove undefined item
    const mapped = _.mapValues(_.keyBy(filtered, 'name'), 'value');
    return mapped;

}