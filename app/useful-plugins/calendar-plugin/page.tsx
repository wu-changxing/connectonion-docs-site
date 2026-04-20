'use client'

import React from 'react'
import { HiOutlineCalendar, HiOutlineArrowRight, HiOutlineCheckCircle, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function CalendarPluginPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'calendar_plugin' },
          ]}
          icon={HiOutlineCalendar}
          iconColor="icon-ui"
          title="calendar_plugin"
          description="Require approval for calendar modifications"
          markdownPath="/useful-plugins/calendar_plugin.md"
          markdownFilename="calendar-plugin.md"
        />

        {/* What it does */}
        <section className="mb-12">
          <h2 className="heading-2">What it does</h2>
          <p className="text-gray-700 mb-6">
            Before any calendar modification, this plugin shows a preview and asks for confirmation:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlinePlus className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold">Create Events</h3>
              </div>
              <p className="text-sm text-gray-700">Shows title, time, attendees (who will receive invites!)</p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlinePencil className="w-5 h-5 icon-ui" />
                <h3 className="font-semibold">Update Events</h3>
              </div>
              <p className="text-sm text-gray-700">Shows what's changing (time, attendees, etc.)</p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineTrash className="w-5 h-5 text-gray-400" />
                <h3 className="font-semibold">Delete Events</h3>
              </div>
              <p className="text-sm text-gray-700">Warns that deletion is permanent</p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineCalendar className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold">Create Meetings</h3>
              </div>
              <p className="text-sm text-gray-700">Google Meet with attendees who will be notified</p>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import Agent, GoogleCalendar
from connectonion.useful_plugins import calendar_plugin

calendar = GoogleCalendar()  # Requires OAuth: co auth google

agent = Agent("scheduler", tools=[calendar], plugins=[calendar_plugin])

agent.input("Schedule a meeting with John tomorrow at 2pm")`}
            result={`┌─ Create Event ─────────────────────────┐
│ Title: Meeting with John               │
│ Start: 2024-01-15 14:00                │
│ End: 2024-01-15 15:00                  │
│ Attendees: john@example.com            │
│            (will receive invite!)      │
└────────────────────────────────────────┘
Proceed with create event?
> Yes, create event
> Auto approve all calendar actions this session
> No, tell agent what I want`}
            language="python"
          />
          <p className="text-gray-700 mt-4 text-sm">
            Want to customize? Run <Link href="/cli" className="text-gray-500 hover:text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">co copy calendar_plugin</code></Link> to get an editable copy.
          </p>
        </section>

        {/* Protected Operations */}
        <section className="mb-12">
          <h2 className="heading-2">Protected Operations</h2>
          <p className="text-gray-700 mb-4">
            These calendar methods require approval:
          </p>
          <div className="bg-gray-100 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-2 text-gray-700">Method</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Action</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Preview Shows</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2"><code>create_event</code></td>
                  <td className="py-2 text-gray-700">Create calendar event</td>
                  <td className="py-2 text-gray-700">Title, time, attendees, location</td>
                </tr>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2"><code>create_meet</code></td>
                  <td className="py-2 text-gray-700">Create Google Meet</td>
                  <td className="py-2 text-gray-700">Title, time, attendees</td>
                </tr>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2"><code>update_event</code></td>
                  <td className="py-2 text-gray-700">Modify existing event</td>
                  <td className="py-2 text-gray-700">Event ID, changed fields</td>
                </tr>
                <tr>
                  <td className="py-2"><code>delete_event</code></td>
                  <td className="py-2 text-gray-700">Delete event</td>
                  <td className="py-2 text-gray-700">Event ID, warning message</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-700 mt-4">
            Read-only operations like <code>list_events</code>, <code>get_event</code>, <code>search_events</code> are automatically allowed.
          </p>
        </section>

        {/* Approval Options */}
        <section className="mb-12">
          <h2 className="heading-2">Approval Options</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-100 rounded-lg flex items-start gap-3">
              <HiOutlineCheckCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">Yes, {'{action}'}</strong>
                <p className="text-sm text-gray-700">Proceed with this specific action</p>
              </div>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg flex items-start gap-3">
              <HiOutlineCheckCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">Auto approve all calendar actions this session</strong>
                <p className="text-sm text-gray-700">Skip approval for all calendar operations</p>
              </div>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg flex items-start gap-3">
              <HiOutlineCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">No, tell agent what I want</strong>
                <p className="text-sm text-gray-700">Reject and provide alternative instructions</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="heading-2">How it works</h2>
          <CodeWithResult
            code={`WRITE_METHODS = ('create_event', 'create_meet', 'update_event', 'delete_event')

@before_each_tool
def check_calendar_approval(agent):
    pending = agent.current_session.get('pending_tool')
    if not pending:
        return

    tool_name = pending['name']
    if tool_name not in WRITE_METHODS:
        return

    # Skip if all actions auto-approved
    if agent.current_session.get('calendar_approve_all', False):
        return

    args = pending['arguments']

    # Build preview based on action type
    preview = Text()
    if tool_name == 'create_event':
        preview.append(f"Title: {args.get('title')}\\n")
        preview.append(f"Start: {args.get('start_time')}\\n")
        if args.get('attendees'):
            preview.append(f"Attendees: {args['attendees']} (will receive invite!)\\n")
        # ...

    # Show preview and get choice
    console.print(Panel(preview, title=f"[yellow]{action}[/yellow]"))

    choice = pick(f"Proceed with {action}?", options)

    if choice == "No, tell agent what I want":
        feedback = input("What do you want instead? ")
        raise ValueError(f"User feedback: {feedback}")`}
            language="python"
          />
        </section>

        {/* Events used */}
        <section className="mb-12">
          <h2 className="heading-2">Events Used</h2>
          <div className="bg-gray-100 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-2 text-gray-700">Event</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Handler</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2"><code className="text-gray-700">before_each_tool</code></td>
                  <td className="py-2">check_calendar_approval</td>
                  <td className="py-2 text-gray-700">Preview and approve calendar changes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Related */}
        <section className="mb-12">
          <h2 className="heading-2">Related</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/google-integration" className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <strong className="text-gray-900">Google Calendar Tool</strong>
              <p className="text-sm text-gray-700">Learn about the GoogleCalendar tool</p>
            </Link>
            <Link href="/useful-plugins/gmail-plugin" className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <strong className="text-gray-900">Gmail Plugin</strong>
              <p className="text-sm text-gray-700">Similar approval flow for emails</p>
            </Link>
          </div>
        </section>

        {/* Source */}
        <section className="mb-12">
          <h2 className="heading-2">Source</h2>
          <p className="text-gray-700">
            <code className="bg-gray-100 px-2 py-1 rounded">connectonion/useful_plugins/calendar_plugin.py</code>
          </p>
          <CodeWithResult
            code={`# Bundle as plugin
calendar_plugin = [
    check_calendar_approval,
]`}
            language="python"
          />
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
