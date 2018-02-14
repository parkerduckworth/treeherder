import PropTypes from 'prop-types';
import React from 'react';
import JobButton from './JobButton';
import JobGroup from './JobGroup';
import { getStatus } from "../helpers/jobHelper";

export default class JobsAndGroups extends React.Component {
  render() {
    const { $injector, groups, repoName } = this.props;

    return (
      <td className="job-row">
        {groups.map((group, i) => {
          if (group.symbol !== '?') {
            return (
              group.visible && <JobGroup
                group={group}
                repoName={repoName}
                $injector={$injector}
                refOrder={i}
                key={group.mapKey}
                ref={i}
              />
            );
          }
          return (
            group.jobs.map(job => (
              <JobButton
                job={job}
                $injector={$injector}
                repoName={repoName}
                visible={job.visible}
                status={getStatus(job)}
                failureClassificationId={job.failure_classification_id}
                key={job.id}
                hasGroup={false}
                ref={i}
                refOrder={i}
              />
            ))
          );
        })}
      </td>
    );
  }
}

JobsAndGroups.propTypes = {
  groups: PropTypes.array.isRequired,
  $injector: PropTypes.object.isRequired,
  repoName: PropTypes.string.isRequired,
};
