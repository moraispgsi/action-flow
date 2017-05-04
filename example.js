let lowLevelActions = require('./lowLevelActions');
let vm = require('vm');

let $a = lowLevelActions.makeAction;
let $t = $a.transition;
let $i = (property) => $a.getInstanceProperty(property);
let $is = (property, value) => $a.setInstanceProperty(property, value);
let $d = (property) => $a.getDataProperty(property);
let $ds = (property, value) => $a.setDataProperty(property, value);
let $f = $a.getFixed;
let $seq = $a.actionSequence;
let $c = $a.context;
let $http = $a.httpRequest;
let $log = $a.log;

let instance = {
    properties: {
        host: "localhost/",
        date: {
            id: 1
        }
    }
};
function bar(foo){

    $seq(
        $is('date.extensionDate', $d('extensionDate')),
        $http($i('host'), '/CreateExtensionDate',
            $c({}, $seq(
                $ds('extensionDate', $d('extensionDate')),
                $ds('id', $i('date.id'))
            )),
            $seq(
                $ds('id', $i('date.id')),
                $is('date.extensionDate', 'extensionDate'),
                $is('date.hasExtension', true),
                $t('dateExtension')
            )
        )
    )(instance, foo);

}

