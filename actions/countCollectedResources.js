export default function countCollectedResources(context, payload, done) {
    context.service.read('dataset.countCollectedResources', payload, {}, function (err, res) {
        if (err) {
            context.dispatch('UPDATE_COLLECTED_TOTAL__FAILURE', err);
        } else {
            context.dispatch('UPDATE_COLLECTED_TOTAL', res);
        }
        done(null, res);
    });
}
