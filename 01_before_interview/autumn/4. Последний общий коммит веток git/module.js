// Выбросить ошибку вместо текста

function getLastCommonCommitMessage(commits, branches) {
    let commitsFromBranches = [];
    let commonCommits = new Set();

    // Поиск всех коммитов, которые принадлежат 
    // хотя бы одной ветке
    for (const commit of commits) {
        if (!commit.branches) continue;
        // if (commit.branches.includes(branches[0])
        //     && commit.branches.includes(branches[1]))
        //     commonCommits.add(commit);

        for (const branch of commit.branches) {
            if (branches.includes(branch)) {
                commitsFromBranches.push(commit);
                break;
            }
        }
    }

    if (branches[0] === branches[1] && commitsFromBranches.length > 0)
        return getLastMessage(commitsFromBranches);

    if (commitsFromBranches.length === 0) throw new Error('No common commit');
    // if (commitsFromBranches.length === 0) return "Error(\'No common commit\')";

    let parents = new Map();
    for (const commit of commitsFromBranches) {
        if (!commit.parents) continue;
        for (const parent of commit.parents) {
            let repCount = parents.get(parent);
            if (repCount === 1)
                commonCommits.add(getCommitById(parent, commits));
            else if (repCount === undefined) parents.set(parent, 0);
            repCount = parents.get(parent);
            parents.set(parent, repCount + 1);
        }
    }

    if (commonCommits.length === 0) throw new Error('No common commit');
    // if (commonCommits.length === 0) return "Error(\'No common commit\')";

    return getLastMessage(Array.from(commonCommits));
}

function getCommitById(id, commits) {
    for (const commit of commits) {
        if (commit.id === id) return commit
    }
}

function getLastMessage(commits) {
    let sorted = commits.sort((prev, next) => next.timestamp - prev.timestamp);
    if (sorted[0])
        return sorted[0].message || '';
    else return '';
}

module.exports = {getLastCommonCommitMessage};