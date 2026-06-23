//using Microsoft.AspNetCore.Mvc;

//namespace EMS.Server.Controllers
//{
//    public class EmployeesController : Controller
//    {
//        public IActionResult Index()
//        {
//            return View();
//        }
//    }
//}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EMS.Server.Data;
using EMS.Server.Models;
using EMS.API.Models;

namespace EMS.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/employees?page=1&pageSize=10&searchTerm=john&sortBy=firstName&sortDirection=asc
        [HttpGet]
        public async Task<ActionResult<PagedResult<Employee>>> GetEmployees(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? searchTerm = null,
        [FromQuery] string? sortBy = null,
        [FromQuery] string sortDirection = "asc")
        {
            var query = _context.Employees.AsQueryable();

            // Apply search filter
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                var term = searchTerm.ToLower();
                query = query.Where(e =>
                    e.FirstName.ToLower().Contains(term) ||
                    e.LastName.ToLower().Contains(term) ||
                    e.Email.ToLower().Contains(term) ||
                    e.Department.ToLower().Contains(term));
            }

            // Apply sorting
            if (!string.IsNullOrWhiteSpace(sortBy))
            {
                query = sortBy.ToLower() switch
                {
                    "firstname" => sortDirection == "asc"
                        ? query.OrderBy(e => e.FirstName)
                        : query.OrderByDescending(e => e.FirstName),
                    "email" => sortDirection == "asc"
                        ? query.OrderBy(e => e.Email)
                        : query.OrderByDescending(e => e.Email),
                    "department" => sortDirection == "asc"
                        ? query.OrderBy(e => e.Department)
                        : query.OrderByDescending(e => e.Department),
                    _ => query.OrderBy(e => e.Id)
                };
            }
            else
            {
                query = query.OrderBy(e => e.Id);
            }

            // Get total count before pagination
            var totalRecords = await query.CountAsync();

            // Apply pagination
            var employees = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // Create the paged result
            var result = new PagedResult<Employee>
            {
                Data = employees,
                TotalRecords = totalRecords,
                CurrentPage = page,
                PageSize = pageSize
            };

            return result;
        }

        // GET: api/employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();
            return employee;
        }

        // POST: api/employees
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        // PUT: api/employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.Id) return BadRequest();
            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}