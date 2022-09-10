<tr id="tr-<?php print($id)?>" onclick="trClick(<?php print($id)?>)">
    <td><?php print($id) ?></td>
    <td><?php print($name) ?></td>
    <td><?php print($date) ?></td>
    <td><button onclick="event.stopPropagation();delConf(<?php print($id) ?>)" class="btn btn-danger">Delete</button></td>
</tr>