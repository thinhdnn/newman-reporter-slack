const { slackUtils } = require('./slackUtils')

function SlackNewmanReporter (emitter, reporterOptions) {
  if (missingReporterOptions(reporterOptions)) {
    return
  }
  const webhookUrl = reporterOptions.webhookurl
  const messageSize = reporterOptions.messageSize || 100
  const collection = reporterOptions.collection || ''
  const environment = reporterOptions.environment || ''
  const token = reporterOptions.token || ''
  const reportingUrl = reporterOptions.reportingurl || ''
  let channel = reporterOptions.channel || ''
  let limitFailures = reporterOptions.limitFailures || null
  const authorName = reporterOptions.authorName || ''
  const onlyFailure = reporterOptions.onlyFailure || false
  const overFailures = reporterOptions.overFailures || 0
  const allExecutions = reporterOptions.allExecutions || false
  let summaryExecutions = []

  emitter.on('done', (error, summary) => {
    if (error) {
      console.error('error in done')
      return
    }
    let run = summary.run

    if (!allExecutions) {
      if (run.failures.length > overFailures && onlyFailure) {
        slackUtils.send(
          webhookUrl,
          slackUtils.slackMessage(
            run.stats,
            run.timings,
            run.failures,
            run.executions,
            allExecutions,
            null,
            messageSize,
            collection,
            environment,
            channel,
            reportingUrl,
            limitFailures,
            authorName
          ),
          token
        )
      }
      if (!onlyFailure) {
        slackUtils.send(
          webhookUrl,
          slackUtils.slackMessage(
            run.stats,
            run.timings,
            run.failures,
            run.executions,
            allExecutions,
            null,
            messageSize,
            collection,
            environment,
            channel,
            reportingUrl,
            limitFailures,
            authorName
          ),
          token
        )
      }
    } else {
      run.executions.forEach(execution => {
        if (execution.assertions.length === 0) {
          summaryExecutions.push({
            title: `${execution.title} : Skipped`,
            short: 'skipped'
          })
        } else {
          //console.log(execution.assertions);
          execution.assertions.forEach(assertion => {
            console.log(assertion)
            const assertionText = assertion.assertion
            if (assertion.error) {
              summaryExecutions.push({
                title: `${assertionText} : Failed :fire:`,
                short: 'false'
              })
            } else {
              summaryExecutions.push({
                title: `${assertionText} : Passed :white_check_mark:`,
                short: 'true'
              })
            }
          })
        }
      })

      slackUtils.send(
        webhookUrl,
        slackUtils.slackMessage(
          run.stats,
          run.timings,
          run.failures,
          run.executions,
          allExecutions,
          summaryExecutions,
          messageSize,
          collection,
          environment,
          channel,
          reportingUrl,
          limitFailures,
          authorName
        ),
        token
      )
    }
  })

  function missingReporterOptions (reporterOptions) {
    let missing = false
    if (!reporterOptions.webhookurl) {
      console.error('Missing Slack Webhook Url')
      missing = true
    }
    if (
      reporterOptions.webhookurl === 'https://slack.com/api/chat.postMessage'
    ) {
      if (!reporterOptions.token) {
        console.error('Missing Bearer Token')
        missing = true
      }
      if (!reporterOptions.channel) {
        console.error('Missing channel')
        missing = true
      }
    }
    return missing
  }
}
module.exports = SlackNewmanReporter
