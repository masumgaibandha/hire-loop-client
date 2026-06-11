import { getCompanyJobs } from "@/lib/api/jobs";
import { Button, Table } from "@heroui/react";
import { Eye, PencilToLine, TrashBin, Plus } from "@gravity-ui/icons";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const RecruitersJobs = async () => {
  const company = await getLoggedInRecruiterCompany();
  const jobs = company?._id ? await getCompanyJobs(company._id) : [];

  return (
    <div className="space-y-6 px-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Manage Jobs</h2>
          <p className="mt-1 text-sm text-white/45">
            Manage all jobs posted by your company. Total jobs:{" "}
            {jobs?.length || 0}
          </p>
        </div>

        <a href="/dashboard/recruiter/jobs/new">
          <Button className="bg-white font-semibold text-black">
            <Plus className="size-4" />
            Post New Job
          </Button>
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#171717] shadow-xl">
        <Table aria-label="Recruiter Jobs Table">
          <Table.Content>
            <Table.Header>
              <Table.Column isRowHeader>Job Title</Table.Column>
              <Table.Column>Type/Category</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>

            <Table.Body>
              {jobs?.map((job) => (
                <Table.Row
                  key={String(job._id)}
                  className="border-b border-white/10"
                >
                  <Table.Cell>
                    <div className="py-2">
                      <h4 className="text-sm font-semibold text-white">
                        {job.title}
                      </h4>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="py-2">
                      <h4 className="text-sm font-semibold text-white">
                        {job.type}
                      </h4>
                      <p className="mt-1 text-xs text-white/45">
                        {job.category}
                      </p>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-white/70">
                      {job.isRemote ? "Remote" : job.location}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium capitalize text-green-400">
                      {job.status}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <a href={`/dashboard/recruiter/jobs/${job._id}`}>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-white/70"
                        >
                          <Eye className="size-4" />
                        </Button>
                      </a>

                      <a href={`/dashboard/recruiter/jobs/${job._id}/edit`}>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-white/70"
                        >
                          <PencilToLine className="size-4" />
                        </Button>
                      </a>

                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-red-400"
                      >
                        <TrashBin className="size-4" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table>

        {jobs?.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-white/50">No jobs found.</p>

            <a href="/dashboard/recruiter/jobs/new">
              <Button className="mt-4 bg-white font-semibold text-black">
                <Plus className="size-4" />
                Post Your First Job
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruitersJobs;
