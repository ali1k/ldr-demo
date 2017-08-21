export default function collectData(context, payload, done) {
    context.service.read('dataset.collectData', payload, {}, function (err, res) {
        done();
    });
}
