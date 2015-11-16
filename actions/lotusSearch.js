export default function lotusSearch(context, payload, done) {
    context.dispatch('START_TASK_LOTUS', {});
    context.service.read('lotus.search', payload, {timeout: 5 * 1000}, function (err, res) {
        if (err) {
            context.dispatch('LOTUS_SEARCH_FAILURE', err);
        } else {
            context.dispatch('LOTUS_SEARCH_SUCCESS', res);
        }
        done();
    });
}
