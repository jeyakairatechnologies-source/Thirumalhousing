async function runTests() {
  const baseUrl = 'http://localhost:5000/api';
  console.log('--- 1. Testing Health Endpoint ---');
  const healthRes = await fetch(`${baseUrl}/health`);
  const health = await healthRes.json();
  console.log('Health:', health);

  console.log('\n--- 2. Testing Projects Listing ---');
  const projRes = await fetch(`${baseUrl}/projects`);
  const projects = await projRes.json();
  console.log(`Found ${projects.count} projects:`);
  projects.data.forEach(p => {
    console.log(` - ${p.name} [${p.status}] Starting from ₹${p.price.startingFrom} ${p.price.priceUnit} (${p.location.city})`);
  });

  console.log('\n--- 3. Testing Single Project by Slug ---');
  const slugRes = await fetch(`${baseUrl}/projects/thirumal-green-city`);
  const singleProj = await slugRes.json();
  console.log(`Retrieved: ${singleProj.data.name}`);
  console.log(`Total Units: ${singleProj.data.totalUnits}, Available: ${singleProj.data.availableUnits}`);
  console.log(`Highlights count: ${singleProj.data.highlights.length}, Amenities count: ${singleProj.data.amenities.length}`);

  console.log('\n--- 4. Testing Lead / Enquiry Submission ---');
  const leadRes = await fetch(`${baseUrl}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Venkatesh S',
      phone: '9840199999',
      email: 'venkatesh@gmail.com',
      project: singleProj.data._id,
      projectName: singleProj.data.name,
      message: 'Interested in 1200 sq ft plot in Green City. Free on Sunday for visit.',
      source: 'project-page'
    })
  });
  const lead = await leadRes.json();
  console.log('Lead submission response:', lead.message);
  const leadId = lead.data._id;
  console.log('Created Lead ID:', leadId, 'Status:', lead.data.status);

  console.log('\n--- 5. Testing Admin Authentication ---');
  const authRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@thirumalhousing.com',
      password: 'Admin@123'
    })
  });
  const auth = await authRes.json();
  console.log('Admin login success:', auth.success, 'User:', auth.data.name);
  const token = auth.data.token;

  console.log('\n--- 6. Testing CRM Status Transition ---');
  const updateRes = await fetch(`${baseUrl}/enquiries/${leadId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      status: 'contacted',
      notes: 'Spoke with Venkatesh. Scheduled cab pickup for Sunday 10:30 AM.'
    })
  });
  const updatedLead = await updateRes.json();
  console.log('Updated Status:', updatedLead.data.status);
  console.log('Staff Notes:', updatedLead.data.notes);

  console.log('\n--- 7. Testing Dashboard Metrics ---');
  const statsRes = await fetch(`${baseUrl}/enquiries/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const stats = await statsRes.json();
  console.log('Dashboard Stats Summary:');
  console.log(` - Total Projects: ${stats.data.totalProjects} (Ongoing: ${stats.data.ongoingProjects}, ongoing: ${stats.data.ongoingProjects}, Completed: ${stats.data.completedProjects})`);
  console.log(` - Total Leads: ${stats.data.totalEnquiries}, New: ${stats.data.newEnquiries}, Today: ${stats.data.todayEnquiries}`);
  console.log(` - Recent Leads in pipeline: ${stats.data.recentEnquiries.length}`);

  console.log('\n ALL TESTS COMPLETED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
