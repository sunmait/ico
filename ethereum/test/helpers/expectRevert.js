module.exports = async (promise, message) => {
    try {
        await promise;
    }
    catch (error) {
        const revert = error.message.search('revert') >= 0;
        assert.isOk(revert, "Something went wrong:\n" + error);

        return;
    }

    assert.isOk(false, message);
}